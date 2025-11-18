export enum Category {
  MOTIVATION = 'Motivación y Superación Personal',
  BEHAVIOR = 'El Enigma del Comportamiento Humano',
  UNCONSCIOUS = 'Las Profundidades del Inconsciente'
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  book: string;
  category: Category;
  visualId: string;
}

export interface VideoGenerationConfig {
  prompt: string;
  aspectRatio: '9:16';
}