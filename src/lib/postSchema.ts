import { z } from "zod";

export const Section = z.object({
  heading: z.string().optional().default(""),
  bodyMd: z.string().optional().default(""),
  imageUrl: z.string().url().optional().nullable(),
  imagePosition: z.enum(["left", "right", "full"]).default("full"),
});

export const PostInput = z.object({
  id: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  subtitle: z.string().optional().default(""),
  excerpt: z.string().optional().default(""),
  author: z.string().min(2),
  // data afişată în pagină (selectată manual în admin, format "YYYY-MM-DD")
  articleDate: z.string().optional().default(""),
  coverUrl: z.string().url().optional().nullable(),
  tags: z.array(z.string()).default([]),
  sections: z.array(Section).default([]),
  published: z.boolean().default(false),
  // dates (server-populate)
  createdAt: z.any().optional(),
  updatedAt: z.any().optional(),
  publishedAt: z.any().optional(),
});

export type PostInput = z.infer<typeof PostInput>;
export type Section = z.infer<typeof Section>;
