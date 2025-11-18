import { Category, Quote } from './types';

export const APP_NAME = "PsyQuotes";

export const QUOTES: Quote[] = [
  {
    id: 'F-001',
    text: "El encuentro de dos personalidades es como el contacto de dos sustancias químicas: si hay alguna reacción, ambas se transforman.",
    author: "Carl Jung",
    book: "Los Arquetipos y el Inconsciente Colectivo",
    category: Category.UNCONSCIOUS,
    visualId: "quimica-transformacion"
  },
  {
    id: 'F-002',
    text: "Cuando ya no somos capaces de cambiar una situación, nos encontramos ante el desafío de cambiarnos a nosotros mismos.",
    author: "Viktor Frankl",
    book: "El hombre en busca de sentido",
    category: Category.MOTIVATION,
    visualId: "camino-invierno-resistencia"
  },
  {
    id: 'F-003',
    text: "Las emociones inexpresadas nunca mueren. Son enterradas vivas y salen más tarde de peores formas.",
    author: "Sigmund Freud",
    book: "Estudios sobre la histeria",
    category: Category.BEHAVIOR,
    visualId: "sombras-emergiendo-subsuelo"
  },
  {
    id: 'F-004',
    text: "Quien tiene un porqué para vivir puede soportar casi cualquier cómo.",
    author: "Friedrich Nietzsche",
    book: "El crepúsculo de los ídolos",
    category: Category.MOTIVATION,
    visualId: "luz-al-final-tunel"
  },
  {
    id: 'F-005',
    text: "Todo lo que nos irrita de los demás puede llevarnos a un entendimiento de nosotros mismos.",
    author: "Carl Jung",
    book: "Memorias, sueños, reflexiones",
    category: Category.UNCONSCIOUS,
    visualId: "espejo-reflejo-distorsionado"
  },
  {
    id: 'F-006',
    text: "La curiosa paradoja es que cuando me acepto tal como soy, entonces puedo cambiar.",
    author: "Carl Rogers",
    book: "El proceso de convertirse en persona",
    category: Category.BEHAVIOR,
    visualId: "metamorfosis-suave-agua"
  },
  {
    id: 'F-007',
    text: "No somos lo que nos ha pasado, somos lo que decidimos ser.",
    author: "Carl Jung",
    book: "Obras Completas",
    category: Category.MOTIVATION,
    visualId: "fenix-renacer-cenizas"
  },
  {
    id: 'F-008',
    text: "La mente es como un iceberg, flota con una séptima parte de su materia sobre el agua.",
    author: "Sigmund Freud",
    book: "El yo y el ello",
    category: Category.UNCONSCIOUS,
    visualId: "iceberg-profundo-oceano"
  }
];

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.MOTIVATION]: 'text-amber-400',
  [Category.BEHAVIOR]: 'text-blue-400',
  [Category.UNCONSCIOUS]: 'text-purple-400',
};

export const CATEGORY_BG_GRADIENTS: Record<Category, string> = {
  [Category.MOTIVATION]: 'from-neutral-900 to-amber-950',
  [Category.BEHAVIOR]: 'from-neutral-900 to-blue-950',
  [Category.UNCONSCIOUS]: 'from-neutral-900 to-purple-950',
};