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
    console.warn("API Key is missing or invalid. Switching to Demo Mode.");
    return {
      ...MOCK_NOTE_CONTENT,
      summary: `(Demo Mode) You are viewing sample notes for "${topicName}". To generate custom AI notes, please connect a valid Google Gemini API Key.`
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

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");

    // Robust JSON Parsing
    try {
      const startIndex = text.indexOf('{');
      const endIndex = text.lastIndexOf('}');
      
      if (startIndex === -1 || endIndex === -1) {
        throw new Error("No JSON object found in response");
      }

      const jsonString = text.substring(startIndex, endIndex + 1);
      return JSON.parse(jsonString) as NoteContent;
    } catch (parseError) {
      console.error("Gemini API Error: Failed to parse JSON.", parseError);
      // Fallback 2: Parsing Error
      return {
        ...MOCK_NOTE_CONTENT,
        summary: `We successfully connected to the AI but received an invalid format for "${topicName}". Showing standard revision points instead.`,
        keyConcepts: [
          `Review the NCERT definition for ${topicName}`,
          "Focus on the solved examples in your textbook",
          "Practice previous year questions related to this topic"
        ]
      };
    }

  } catch (error) {
    console.error("Gemini API Network/Gen Error:", error);
    // Fallback 3: Network/API Error - Clean Message
    return {
       ...MOCK_NOTE_CONTENT,
       summary: `We are currently viewing offline notes for "${topicName}". The AI service is unavailable at the moment (check your network or API Key). These notes cover the essentials.`,
       keyConcepts: [
         "Key Concept 1: Refer to your primary textbook",
         "Key Concept 2: Review class notes", 
         "Key Concept 3: Practice diagrams and graphs"
       ]
    }; 
  }
};

export const searchVideoRecommendations = async (query: string): Promise<VideoSearchResult[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey.length < 10) return [];

  try {
    const ai = new GoogleGenAI({ apiKey });
    const modelId = "gemini-2.5-flash"; 

    const prompt = `
      You are a smart video search engine helper for Class 10 students.
      Search for the best, most reliable, and currently active YouTube videos for the topic: "${query}".
      
      CRITICAL REQUIREMENTS:
      1. ONLY select videos from reputable educational channels (e.g., Physics Wallah, Dear Sir, Magnet Brains, EduMantra, Green Board, Khan Academy, Vedantu, Unacademy).
      2. Prioritize videos uploaded in 2023, 2024, or 2025 to ensure they are current and NOT deleted.
      3. Do NOT include videos that look like spam, are age-restricted, or have broken links.
      4. Find at least 6 distinct results.
      5. You MUST include the specific valid YouTube Link for each video found via the Google Search tool.
      
      Output Format Block:
      ||VIDEO||
      Title: [Video Title]
      Channel: [Channel Name]
      URL: [YouTube URL]
      Description: [Brief summary]
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

    const text = response.text || "";
    const results: VideoSearchResult[] = [];
    const seenIds = new Set<string>();

    const blockRegex = /\|\|VIDEO\|\|[\s\S]*?Title:\s*(.*?)[\r\n]+Channel:\s*(.*?)[\r\n]+URL:\s*(.*?)[\r\n]+Description:\s*(.*?)[\r\n]+\|\|END\|\|/gi;
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
  if (!apiKey || apiKey.length < 10) return null;

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