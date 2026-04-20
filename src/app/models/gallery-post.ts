export interface GalleryPost {
  id?: string;

  title: string;
  description: string;

  water: string;

  fishGroup: string;
  species?: string;

  weight?: number | null;
  length?: number | null;

  bait?: string;
  method?: string;
  timeOfDay?: string;

  released?: boolean;

  imageUrl: string;

  uid: string;
  userName?: string;

  createdAt: any;
}