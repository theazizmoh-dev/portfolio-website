import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'your-project-id', // Replace with your Sanity project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Sanity GROQ queries
export const queries = {
  // Get all blog posts
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "author": author->name,
    "mainImage": mainImage.asset->url
  }`,

  // Get single blog post
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body,
    excerpt,
    publishedAt,
    "author": author->name,
    "mainImage": mainImage.asset->url
  }`,

  // Get all projects
  allProjects: `*[_type == "project"] | order(order asc) {
    _id,
    title,
    description,
    technologies,
    "image": image.asset->url,
    projectUrl,
    githubUrl
  }`,

  // Get all services
  allServices: `*[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    "icon": icon.asset->url,
    features
  }`
};

// Types
export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  author: string;
  mainImage: string;
  body?: any; // Portable Text
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  projectUrl?: string;
  githubUrl?: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}