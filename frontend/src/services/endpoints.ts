import { api } from './api';

// --- Types ---
export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'admin';
  };
}

export interface Content {
  _id: string;
  title: string;
  description: string;
  type: 'video' | 'quiz' | 'text';
  difficulty: 'easy' | 'medium' | 'hard';
  url?: string;
  duration?: number;
  tags?: string[];
}

export interface ContentResponse {
  contents: Content[];
  success: boolean;
  count: number;
  data: Content[];
}

export interface EmotionAdaptRequest {
  image: string; // base64
}

export interface EmotionAdaptResponse {
  success: boolean;
  emotion: string;
  confidence: number;
  action: string;
  difficulty: string;
  contents: Content[];
}

export interface ChartData {
  emotion?: string;
  count?: number;
  _id?: any;
  interactions?: number;
}

export interface AnalyticsResponse {
  success: boolean;
  data: ChartData[];
}

// --- Endpoints ---
export const authService = {
  login: (data: any) => api.post<AuthResponse>('/auth/login', data),
  register: (data: any) => api.post<AuthResponse>('/auth/register', data),
};

export const contentService = {
  getAll: () => api.get<ContentResponse>('/content'),
  getById: (id: string) => api.get<{ success: boolean; data: Content }>(`/content/${id}`),
};

export const emotionService = {
  adapt: (data: EmotionAdaptRequest) => api.post<EmotionAdaptResponse>('/emotion/adapt', data),
};

export const analyticsService = {
  getDistribution: () => api.get<AnalyticsResponse>('/analytics/distribution'),
  getTrends: () => api.get<AnalyticsResponse>('/analytics/trends'),
  getTopUsers: () => api.get<AnalyticsResponse>('/analytics/top-users'),
};
