// date temporare până integrăm Firebase
export type BlogPost = {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  image: string;
  category: string;
  date: string; // ISO sau text
  author: string;
  excerpt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "SERVICII DE TRANSPORT",
    subtitle: "VIITORUL ESTE AICI, TU EȘTI PREGĂTIT?",
    slug: "servicii-de-transport-viitorul-este-aici",
    image: "/images/blog-hero-1.jpg", // pune tu imaginea în public/images
    category: "Logistică",
    date: "5 iulie 2025",
    author: "Rafael Emre Onișoară, CEO",
    excerpt:
      "Transportul viitorului nu mai e o idee din filmele SF. Este deja aici. Când te uiți în jur, vezi camioane, șoferi, dispecerate. Dar în spatele acestui tablou clasic, schimbarea bate la ușă: transport asistat de inteligență artificială.",
  },
  {
    id: "2",
    title: "SERVICII DE TRANSPORT",
    subtitle: "VIITORUL ESTE AICI, TU EȘTI PREGĂTIT?",
    slug: "servicii-de-transport-viitorul-este-aici-2",
    image: "/images/blog-hero-2.jpg",
    category: "Logistică",
    date: "5 aprilie 2025",
    author: "Rafael Emre Onișoară, CEO",
    excerpt:
      "Transportul viitorului nu mai e o idee din filmele SF. Este deja aici. Când te uiți în jur, vezi camioane, șoferi, dispecerate. Dar în spatele acestui tablou clasic, schimbarea bate la ușă: transport asistat de inteligență artificială.",
  },
];

export const CATEGORIES: { name: string; count: number }[] = [
  { name: "Fără categorie", count: 2 },
  { name: "Logistică", count: 2 },
  { name: "Economie", count: 0 },
  { name: "Supply Chain", count: 0 },
  { name: "Sustenabilitate", count: 0 },
  { name: "Transport", count: 0 },
  { name: "Transport Aerian", count: 0 },
  { name: "Transport Feroviar", count: 0 },
  { name: "Transport Maritim", count: 0 },
];
