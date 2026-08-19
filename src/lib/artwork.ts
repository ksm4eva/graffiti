import type { Artwork, Rating } from '@/data/types';
import { ratings as allRatings } from '@/data/mock';

export function formatPrice(price: number): string {
  return `GH₵ ${price.toLocaleString('en-GH')}`;
}

export function getRatingsForArtwork(artworkId: string, ratings: Rating[] = allRatings) {
  return ratings.filter((r) => r.artworkId === artworkId);
}

export function getAverageRating(artworkId: string, ratings: Rating[] = allRatings): number {
  const list = getRatingsForArtwork(artworkId, ratings);
  if (list.length === 0) return 0;
  return list.reduce((sum, r) => sum + r.stars, 0) / list.length;
}

export function getRatingCount(artworkId: string, ratings: Rating[] = allRatings): number {
  return getRatingsForArtwork(artworkId, ratings).length;
}

export function totalViews(artworks: Artwork[]): number {
  return artworks.reduce((sum, a) => sum + a.views, 0);
}

export function totalPurchases(artworks: Artwork[]): number {
  return artworks.reduce((sum, a) => sum + a.purchases, 0);
}

export function avgRatingAcross(artworks: Artwork[], ratings: Rating[] = allRatings): number {
  const counts = artworks
    .map((a) => getAverageRating(a.id, ratings))
    .filter((n) => n > 0);
  if (counts.length === 0) return 0;
  return counts.reduce((s, n) => s + n, 0) / counts.length;
}
