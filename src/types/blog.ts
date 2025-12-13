export type BlogPost = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  coverUrl?: string | null;
  tags?: string[];
  publishedAt?: Date | null;
  excerpt?: string;
};
