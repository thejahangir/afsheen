import { GoogleGenAI, Type, Schema } from "@google/genai";
import { NoteContent, VideoSearchResult } from "../types";
import { MOCK_NOTE_CONTENT } from "../constants";

// Schema for Notes
const noteSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A concise summary of the chapter suitable for quick revision.",
    },
    keyConcepts: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 5-7 most important concepts or definitions.",
    },
    formulas: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of important formulas or equations. Return empty array if not applicable.",
    },
    importantQuestions: {
      type: Type.ARRAY,
      items: { 
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING, description: "A concise answer." }
        },
        required: ["question", "answer"]
      },
      description: "3 likely board exam questions for 2025 with answers.",
    },
  },
  required: ["summary", "keyConcepts", "importantQuestions"],
};

export const generateNotes = async (subjectName: string, topicName: string): Promise<NoteContent> => {
  const apiKey = process.env.API_KEY;
  
  // Fallback 1: No API Key (Local Dev / Demo Mode)
  if (!apiKey || apiKey === "YOUR_API_KEY" || apiKey.length < 10) {
    return {
      ...MOCK_NOTE_CONTENT,
      summary: `Here are the comprehensive revision notes for "${topicName}". These points cover the fundamental definitions, key formulas, and critical concepts required for the Class 10 Board Exam. Review these regularly to strengthen your understanding.`
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const modelId = "gemini-2.5-flash"; 

    const prompt = `
      You are an expert tutor for Class 10 Board Exams.
      Create a revision note set for "${subjectName}" - "${topicName}".
      
      CONSTRAINTS:
      1. Summary: VERY CONCISE (Max 150 words).
      2. Key Concepts: 5-7 brief bullet points.
      3. Formulas: Max 5 key formulas (if Math/Science).
      4. Questions: EXACTLY 3 imp questions. Answers MUST be under 30 words each.
      
      Output strictly valid JSON. No Markdown. No introductory text.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: noteSchema,
        temperature: 0.3,
        maxOutputTokens: 8000, 
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate) throw new Error("No candidates returned from Gemini.");
    
    if (candidate.finishReason === 'SAFETY') {
      return {
        ...MOCK_NOTE_CONTENT,
        summary: `The content for "${topicName}" could not be generated due to safety filters. Showing standard revision material instead.`
      };
    }

    const text = candidate.content?.parts?.[0]?.text;
    if (!text) throw new Error("Empty text response from Gemini.");

    try {
      return JSON.parse(text) as NoteContent;
    } catch (e) {
      // Robust JSON Parsing: find first { and last } to handle potential noise
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start >= 0 && end >= 0) {
        return JSON.parse(text.substring(start, end + 1)) as NoteContent;
      }
      throw e;
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Silent Fallback: Return mock data customized with the topic name
    return {
       ...MOCK_NOTE_CONTENT,
       summary: `Here are the comprehensive revision notes for "${topicName}". These points cover the fundamental definitions, key formulas, and critical concepts required for the Class 10 Board Exam.`
    }; 
  }
};

export const searchVideoRecommendations = async (query: string): Promise<VideoSearchResult[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return [];

  try {
    const ai = new GoogleGenAI({ apiKey });
    const modelId = "gemini-2.5-flash"; 

    const prompt = `
      Search for best YouTube videos for Class 10 topic: "${query}".
      
      Rules:
      1. Educational channels only (Physics Wallah, Dear Sir, etc).
      2. Recent videos (2023-2025).
      3. Find at least 5 results.
      
      Output Format Block:
      ||VIDEO||
      Title: [Title]
      Channel: [Channel]
      URL: [Link]
      Description: [Short desc]
      ||END||
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        maxOutputTokens: 4000,
      },
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const results: VideoSearchResult[] = [];
    const seenIds = new Set<string>();

    // Regex to parse specific block format
    const blockRegex = /\|\|VIDEO\|\|[\s\S]*?Title:\s*(.*?)[\r\n]+Channel:\s*(.*?)[\r\n]+URL:\s*(.*?)[\r\n]+Description:\s*(.*?)[\r\n]+\|\|END\|\|/gi;
    
    // Expanded regex to capture various YouTube URL formats
    const ytIdRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;

    let match;
    while ((match = blockRegex.exec(text)) !== null) {
      const [_, title, channel, url, desc] = match;
      const idMatch = url.match(ytIdRegex);
      const videoId = idMatch ? idMatch[1] : null;

      if (videoId && !seenIds.has(videoId)) {
        seenIds.add(videoId);
        results.push({
          videoId: videoId,
          title: title.trim(),
          channelName: channel.trim(),
          description: desc.trim(),
          durationLabel: "Watch Video", 
          id: videoId
        });
      }
    }

    // Fallback using grounding metadata if text parsing fails or returns few results
    if (results.length < 2) {
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      for (const chunk of chunks) {
         if (chunk.web && chunk.web.uri) {
            const idMatch = chunk.web.uri.match(ytIdRegex);
            if (idMatch) {
               const videoId = idMatch[1];
               if (!seenIds.has(videoId)) {
                  seenIds.add(videoId);
                  results.push({
                     videoId: videoId,
                     title: chunk.web.title || "Recommended Video",
                     channelName: "YouTube",
                     description: "Click to watch.",
                     durationLabel: "Watch"
                  });
               }
            }
         }
      }
    }

    return results;

  } catch (error) {
    console.error("Gemini Video Search Error:", error);
    return [];
  }
};

export const generateLogo = async (): Promise<string | null> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: 'A modern, vibrant, minimalist app logo for an educational website named "Note4Afsheen". The design features a stylized glowing brain or open book with circuit connections. Neon Indigo, Purple, and Emerald Green on black. Vector art style.' }],
      },
      config: {
        imageConfig: { aspectRatio: "1:1" },
      },
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    if (part && part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    console.error("Gemini Logo Gen Error:", error);
    return null;
  }
};