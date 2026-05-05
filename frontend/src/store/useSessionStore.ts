import { create } from 'zustand';
import type { Content, EmotionAdaptResponse } from '../services/endpoints';

export interface EmotionEntry {
  emotion: string;
  confidence: number;
  timestamp: Date;
}

interface SessionState {
  currentEmotion: string;
  confidence: number;
  adaptiveContents: Content[];
  emotionHistory: EmotionEntry[];
  currentAction: string;
  currentDifficulty: string;
  
  updateFromResponse: (response: EmotionAdaptResponse) => void;
  resetSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  currentEmotion: 'neutral',
  confidence: 0,
  adaptiveContents: [],
  emotionHistory: [],
  currentAction: '',
  currentDifficulty: '',

  updateFromResponse: (response) => {
    set((state) => {
      // Append to history, keeping max 10
      const newHistory = [
        ...state.emotionHistory,
        {
          emotion: response.emotion,
          confidence: response.confidence,
          timestamp: new Date(),
        },
      ];
      if (newHistory.length > 10) {
        newHistory.shift();
      }

      return {
        currentEmotion: response.emotion,
        confidence: response.confidence,
        adaptiveContents: response.contents || [],
        emotionHistory: newHistory,
        currentAction: response.action,
        currentDifficulty: response.difficulty,
      };
    });
  },

  resetSession: () => {
    set({
      currentEmotion: 'neutral',
      confidence: 0,
      adaptiveContents: [],
      emotionHistory: [],
      currentAction: '',
      currentDifficulty: '',
    });
  },
}));
