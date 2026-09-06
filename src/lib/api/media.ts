import { getFullImageUrl } from "../getFullImageUrl";

export interface ApiTvMedia {
  id: number;
  channel: string;
  topic: string;
  link: string;
  platform: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiNewspaperClipImage {
  id: number;
  url: string;
  type?: string;
  provider?: string;
  alt?: string | null;
  size?: number | null;
  mimeType?: string | null;
  createdAt?: string;
}

export interface ApiNewspaperClip {
  id: number;
  title: string;
  date: string;
  imageId?: number;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
  image?: ApiNewspaperClipImage | null;
}

export interface TvMediaApiResponse {
  success: boolean;
  count?: number;
  data: ApiTvMedia[];
}

export interface NewspaperClipsApiResponse {
  success: boolean;
  count?: number;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  data: ApiNewspaperClip[];
}

const DEFAULT_FALLBACK_TV_MEDIA: ApiTvMedia[] = [
  {
    id: 1,
    channel: "চ্যানেল আই",
    topic: "জীবন যেখানে যেমন - আমাদের স্যার",
    link: "https://youtu.be/IFLytBklp7A?si=jtnQChDRgCd57R13",
    platform: "YouTube",
    isAvailable: true,
  },
  {
    id: 2,
    channel: "একাত্তর টিভি",
    topic: "একজন আদর্শ শিক্ষকের গল্প",
    link: "https://youtu.be/tFZGUYHbEGY?si=mteGOWwlbQ8xbJGx",
    platform: "YouTube",
    isAvailable: true,
  },
  {
    id: 3,
    channel: "মাছরাঙা টেলিভিশন",
    topic: "রাঙাসকাল – অতিথি : জনাব মোঃ হামিদুল হক",
    link: "https://youtu.be/AyF4GWKZDEg?si=Bq3oK71Iq4pOalYX",
    platform: "YouTube",
    isAvailable: true,
  },
  {
    id: 5,
    channel: "একাত্তর টিভি",
    topic: "যেভাবে শত শত শিক্ষার্থীদের বদলে দিলেন একজন শিক্ষক",
    link: "https://www.facebook.com/share/v/1BQFxUCCg1/",
    platform: "Facebook",
    isAvailable: true,
  },
];

const DEFAULT_FALLBACK_NEWSPAPER_CLIPS: ApiNewspaperClip[] = [
  {
    id: 1,
    title: "দৈনিক প্রথম আলো - বিশেষ প্রতিবেদন",
    date: "১৫ মে, ২০২২",
    imageId: 1,
    isAvailable: true,
    image: {
      id: 1,
      url: "/images/wings/youth-development.jpg",
      type: "IMAGE",
      provider: "local",
      alt: "দৈনিক প্রথম আলো - বিশেষ প্রতিবেদন",
    },
  },
  {
    id: 2,
    title: "দৈনিক ইত্তেফাক - আইডিয়ার সাফল্যগাথা",
    date: "১০ আগস্ট, ২০২১",
    imageId: 2,
    isAvailable: true,
    image: {
      id: 2,
      url: "/images/wings/social-welfare.jpg",
      type: "IMAGE",
      provider: "local",
      alt: "দৈনিক ইত্তেফাক - আইডিয়ার সাফল্যগাথা",
    },
  },
];

function getApiBaseUrl(): string {
  const origin = (
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api.idealessons.com"
  ).replace(/\/+$/, "");
  return (process.env.BASE_URL ?? `${origin}/api/v1`).replace(/\/+$/, "");
}

/**
 * Fetches all TV Media reports from GET /api/v1/tv-media
 */
export async function getTvMedia(): Promise<ApiTvMedia[]> {
  const apiBase = getApiBaseUrl();
  try {
    const response = await fetch(`${apiBase}/tv-media`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`TV Media API error: status ${response.status}`);
      return DEFAULT_FALLBACK_TV_MEDIA;
    }

    const payload: TvMediaApiResponse = await response.json();
    if (payload.success && Array.isArray(payload.data) && payload.data.length > 0) {
      return payload.data;
    }

    return DEFAULT_FALLBACK_TV_MEDIA;
  } catch (error) {
    console.error("Failed to fetch tv-media:", error);
    return DEFAULT_FALLBACK_TV_MEDIA;
  }
}

/**
 * Fetches newspaper clips from GET /api/v1/newspaper-clips
 */
export async function getNewspaperClips(params?: {
  page?: number;
  limit?: number;
}): Promise<ApiNewspaperClip[]> {
  const apiBase = getApiBaseUrl();
  try {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", params.page.toString());
    if (params?.limit) query.set("limit", params.limit.toString());
    const queryString = query.toString() ? `?${query.toString()}` : "";

    const response = await fetch(`${apiBase}/newspaper-clips${queryString}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Newspaper clips API error: status ${response.status}`);
      return DEFAULT_FALLBACK_NEWSPAPER_CLIPS;
    }

    const payload: NewspaperClipsApiResponse = await response.json();
    if (payload.success && Array.isArray(payload.data) && payload.data.length > 0) {
      return payload.data;
    }

    return DEFAULT_FALLBACK_NEWSPAPER_CLIPS;
  } catch (error) {
    console.error("Failed to fetch newspaper-clips:", error);
    return DEFAULT_FALLBACK_NEWSPAPER_CLIPS;
  }
}
