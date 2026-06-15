export interface Announcement {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  featured?: boolean;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  category: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  category: string;
  image?: string;
}

export interface Faculty {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  students: number;
  programs: number;
  icon: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
}

export interface AnnouncementFilters {
  tag?: string;
  limit?: number;
}

export interface EventFilters {
  category?: string;
  limit?: number;
  upcoming?: boolean;
}
