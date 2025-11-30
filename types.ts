

export interface Topic {
  title: string;
  description: string;
}

export interface Reference {
  title: string;
  url: string;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: string; // Icon name from Lucide
  description: string;
  topics: Topic[];
  references: Reference[];
}

export interface NoteContent {
  summary: string;
  keyConcepts: string[];
  formulas?: string[]; // Optional, mostly for Math/Science
  importantQuestions: {
    question: string;
    answer: string;
  }[];
}

export interface NoteResponse {
  content: NoteContent;
}

export interface SyllabusUnit {
  title: string;
  marks?: number;
  description?: string;
  topics: string[];
}

export interface SyllabusData {
  subjectId: string;
  units: SyllabusUnit[];
}

export interface VideoSearchResult {
  id?: string; // Optional internal ID
  videoId: string; // YouTube Video ID
  title: string;
  channelName: string;
  description: string;
  durationLabel: string; // e.g., "Long form", "Short explanation"
}

export interface PredictionQuestion {
  id: string;
  subjectId: string;
  question: string;
  answer: string;
  marks: number;
  chapter: string;
  type: 'Short' | 'Long' | 'Case Study' | 'Competency';
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type ViewState = 'HOME' | 'SUBJECT' | 'SYLLABUS' | 'VIDEO_SEARCH' | 'EXPECTED_QUESTIONS';

// Lucide icon names mapping type
export type IconName = 'Calculator' | 'FlaskConical' | 'Globe' | 'BookOpen' | 'Languages' | 'Monitor' | 'Brain' | 'Lightbulb' | 'ArrowLeft' | 'Sparkles' | 'Play' | 'Clock' | 'User' | 'Film' | 'Youtube' | 'ExternalLink' | 'Target';