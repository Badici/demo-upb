export type AnnouncementLink = {
  href: string;
  isExternal: boolean;
};

export type Announcement = {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  link: AnnouncementLink | null;
};
