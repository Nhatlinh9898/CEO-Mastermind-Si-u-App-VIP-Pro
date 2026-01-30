export interface BusinessCategory {
  id: string;
  name: string;
  description: string;
  systemPromptAddon: string;
}

export interface FormData {
  industry: string;
  scale: string;
  targetAudience: string;
  coreProblem: string;
  goal: string;
  tone: string;
}

export enum VoiceGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface GenerationState {
  isLoading: boolean;
  content: string | null;
  error: string | null;
  audioUrl: string | null;
  isAudioLoading: boolean;
}