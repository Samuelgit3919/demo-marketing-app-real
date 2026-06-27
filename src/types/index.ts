export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  project: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestimonialInsert {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  project: string;
  order_index?: number;
  is_active?: boolean;
}

export interface TestimonialUpdate {
  name?: string;
  location?: string;
  avatar?: string;
  rating?: number;
  review?: string;
  project?: string;
  order_index?: number;
  is_active?: boolean;
}

export interface GalleryImage {
  src: string;
  title: string;
  description: string;
  spec?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  images: GalleryImage[];
  description: string;
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  heroImage: string;
  features: string[];
  benefits: string[];
  gallery: string[];
  relatedServices: string[];
  icon: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQInsert {
  question: string;
  answer: string;
  category: string;
  order_index?: number;
  is_active?: boolean;
}

export interface FAQUpdate {
  question?: string;
  answer?: string;
  category?: string;
  order_index?: number;
  is_active?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  duration?: string;
}

export interface PricingTier {
  id: string;
  price: string;
  label: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PricingTierInsert {
  price: string;
  label: string;
  order_index?: number;
  is_active?: boolean;
}
