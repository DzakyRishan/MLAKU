export interface PackageItem {
  id: string;
  title: string;
  region: string;
  duration: string;
  price: string;
  rating: number;
  reviewsCount: number;
  badge: string;
  image: string;
  imageAlt: string;
  features: string[];
  description: string;
  itinerary: { day: string; title: string; desc: string }[];
  includes: string[];
  excludes: string[];
}

export interface StoryItem {
  id: string;
  category: string;
  readTime: string;
  author: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  fullContent?: string;
}

export interface DestinationItem {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  recommendation: string;
  bestSeason: string;
  colSpan: string;
  image: string;
  imageAlt: string;
  description: string;
  tags: string[];
  packageKey: string;
}

export type UserRole = 'user' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface InquiryItem {
  id: string;
  userId?: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  destinationTitle: string;
  packageTitle?: string;
  travelDates?: string;
  travelerCount?: number;
  notes?: string;
  adminNotes?: string;
  status: 'pending' | 'reviewed' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface BookmarkItem {
  id: string;
  destinationId: string;
  title: string;
  location?: string;
  imageUrl?: string;
  createdAt: string;
}
