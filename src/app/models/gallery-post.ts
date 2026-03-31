export interface GalleryPost {
  id?: string;
  userId: string;
  imageUrl: string;
  description: string;
  fishingspot: string;
  method: string;
  createdAt: Date;
}