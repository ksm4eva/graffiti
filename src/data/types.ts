export type Category =
  | 'Paintings'
  | 'Posters'
  | 'Leatherwork'
  | 'Sculptures'
  | 'Ceramics';

export const CATEGORIES: Category[] = [
  'Paintings',
  'Posters',
  'Leatherwork',
  'Sculptures',
  'Ceramics',
];

export interface Rating {
  id: string;
  userId: string;
  userName: string;
  artworkId: string;
  stars: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
}

export interface Comment {
  id: string;
  artworkId: string;
  userId: string;
  userName: string;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'responded';
  adminResponse?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  category: Category;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  medium: string;
  dimensions: string;
  year: number;
  available: boolean;
  featured: boolean;
  views: number;
  purchases: number;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  location: string;
  artworksCount: number;
  bio: string;
  medium: string;
}

export interface Purchase {
  id: string;
  artworkId: string;
  artworkTitle: string;
  artistName: string;
  price: number;
  buyerName: string;
  buyerEmail: string;
  delivery: string;
  payment: string;
  date: string;
  status: 'pending' | 'completed' | 'shipped';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joined: string;
}
