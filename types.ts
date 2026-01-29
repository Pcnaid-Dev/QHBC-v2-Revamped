export enum Language {
  EN = 'en',
  AR = 'ar'
}

export interface Service {
  id: string;
  category: string;
  name: string;
  nameAr?: string;
  description: string;
  priceStart?: number;
  image?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  expiry?: string;
}

export interface SocialLink {
  platform: 'Facebook' | 'Instagram' | 'Snapchat' | 'TikTok' | 'WhatsApp';
  url: string;
  label: string;
  icon?: string;
}

export type AIModuleType = 
  | 'makeup'
  | 'nails'
  | 'hair_style'
  | 'hair_color'
  | 'lashes_brows'
  | 'bridal'
  | 'skin_perfector'
  | 'event_look';

export interface AIModuleConfig {
  id: AIModuleType;
  label: string;
  icon: string;
  description: string;
  promptTemplate: string;
  controls: {
    name: string;
    type: 'slider' | 'select' | 'color';
    options?: string[];
    label: string;
  }[];
}
