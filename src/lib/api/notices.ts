export type NoticeCategory = 'Urgent' | 'General' | 'Course Update' | 'Event';

export interface Notice {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string; // ISO 8601 String e.g. "2024-03-25T10:00:00.000Z"
  category: NoticeCategory;
  isPinned: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface NoticeListResponse {
  success: boolean;
  count?: number;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  data: Notice[];
}

export interface SingleNoticeResponse {
  success: boolean;
  data: Notice;
}

const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.idealessons.com").replace(/\/+$/, "");
const API_BASE_URL = BACKEND_URL.endsWith('/api/v1') ? BACKEND_URL : `${BACKEND_URL}/api/v1`;

export const fallbackNotices: Notice[] = [
  {
    id: "notice-1",
    title: "আসন্ন স্পোকেন ইংলিশ কোর্সের সময়সূচী পরিবর্তন",
    excerpt: "আগামী মাসের স্পোকেন ইংলিশ কোর্সের ব্যাচগুলোর ক্লাস রুটিনে কিছু পরিবর্তন আনা হয়েছে।",
    content: "সম্মানিত শিক্ষার্থীবৃন্দ, আপনাদের অবগতির জন্য জানানো যাচ্ছে যে, আগামী মাসের স্পোকেন ইংলিশ কোর্সের ব্যাচগুলোর ক্লাস রুটিনে কিছু পরিবর্তন আনা হয়েছে। নতুন রুটিন অনুযায়ী মঙ্গলবারের ক্লাসগুলো এখন থেকে বুধবারে অনুষ্ঠিত হবে। বিস্তারিত জানতে আপনার ড্যাশবোর্ড চেক করুন অথবা আমাদের হেল্পলাইনে যোগাযোগ করুন।",
    date: "2024-03-25T10:00:00Z",
    category: "Course Update",
    isPinned: true,
  },
  {
    id: "notice-2",
    title: "আইডিয়া সমাজ কল্যাণ সংস্থার নতুন শীতবস্ত্র বিতরণ কর্মসূচি",
    excerpt: "আগামী ১৫ ডিসেম্বর থেকে উত্তরবঙ্গে শীতবস্ত্র বিতরণ শুরু হবে।",
    content: "আইডিয়া সমাজ কল্যাণ সংস্থার উদ্যোগে আগামী ১৫ ডিসেম্বর থেকে উত্তরবঙ্গে শীতবস্ত্র বিতরণ শুরু হতে যাচ্ছে। যারা এই মহৎ কাজে সেচ্ছাসেবক হিসেবে অংশ নিতে বা অনুদান দিতে চান, তারা আমাদের ওয়েবসাইটের মাধ্যমে ফর্ম পূরণ করতে পারেন। আপনাদের সকলের সহযোগিতা একান্ত কাম্য।",
    date: "2024-03-22T14:30:00Z",
    category: "Event",
    isPinned: false,
  },
  {
    id: "notice-3",
    title: "সার্ভার মেইনটেন্যান্স বিজ্ঞপ্তি",
    excerpt: "আগামী শুক্রবার রাত ১২টা থেকে ভোর ৪টা পর্যন্ত ওয়েবসাইট রক্ষণাবেক্ষণের কাজ চলবে।",
    content: "প্রিয় ব্যবহারকারী, আগামী শুক্রবার রাত ১২টা থেকে ভোর ৪টা পর্যন্ত আমাদের ওয়েবসাইটের সার্ভার রক্ষণাবেক্ষণের কাজ চলবে। এই সময়ে লগইন বা কোর্স অ্যাক্সেস করতে সাময়িক সমস্যা হতে পারে। সাময়িক এই অসুবিধার জন্য আমরা আন্তরিকভাবে দুঃখিত।",
    date: "2024-03-20T09:15:00Z",
    category: "Urgent",
    isPinned: false,
  },
  {
    id: "notice-4",
    title: "Rise & Thrive নতুন ওয়ার্কশপ রেজিস্ট্রেশন শুরু",
    excerpt: "মাইন্ড প্রোগ্রামিং ও লাইফ ট্রান্সফরমেশন নিয়ে আমাদের নতুন ওয়ার্কশপের রেজিস্ট্রেশন চলছে।",
    content: "হামিদুল হক স্যারের তত্ত্বাবধানে 'মাইন্ড প্রোগ্রামিং ও লাইফ ট্রান্সফরমেশন' বিষয়ক নতুন ওয়ার্কশপের রেজিস্ট্রেশন শুরু হয়েছে। আসন সংখ্যা সীমিত, তাই আগ্রহী শিক্ষার্থীদের দ্রুত রেজিস্ট্রেশন করার জন্য অনুরোধ করা হচ্ছে। বিস্তারিত রুটিন ও কোর্স ফি জানতে 'Rise & Thrive' সেকশনে ভিজিট করুন।",
    date: "2024-03-18T16:45:00Z",
    category: "Course Update",
    isPinned: false,
  },
  {
    id: "notice-5",
    title: "পবিত্র ঈদুল ফিতর উপলক্ষে অফিস ছুটি",
    excerpt: "পবিত্র ঈদুল ফিতর উপলক্ষে আগামী ১০ দিন অফিস ও ক্লাস কার্যক্রম বন্ধ থাকবে।",
    content: "পবিত্র ঈদুল ফিতর উপলক্ষে আগামী ৫ এপ্রিল থেকে ১৪ এপ্রিল পর্যন্ত আইডিয়া স্পোকেন এর সকল অফিসিয়াল কার্যক্রম এবং ক্লাস বন্ধ থাকবে। ১৫ এপ্রিল থেকে যথারীতি সব কার্যক্রম পুনরায় শুরু হবে। সকলকে অগ্রিম ঈদের শুভেচ্ছা!",
    date: "2024-03-15T11:20:00Z",
    category: "General",
    isPinned: false,
  },
];

// Normalize Category String (Handles 'CourseUpdate' -> 'Course Update')
export function normalizeCategory(cat: string): NoticeCategory {
  if (cat === 'CourseUpdate') return 'Course Update';
  if (['Urgent', 'General', 'Course Update', 'Event'].includes(cat)) {
    return cat as NoticeCategory;
  }
  return 'General';
}

export async function getNotices(params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  isPinned?: boolean;
}): Promise<Notice[]> {
  try {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.search) query.append('search', params.search);
    if (params?.category) {
      // Send backend friendly category slug e.g. CourseUpdate or Course Update
      query.append('category', params.category === 'Course Update' ? 'CourseUpdate' : params.category);
    }
    if (params?.isPinned !== undefined) query.append('isPinned', params.isPinned.toString());

    const url = `${API_BASE_URL}/notices?${query.toString()}`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(`[Notices API] Server returned ${res.status}. Falling back to default notices.`);
      return fallbackNotices;
    }

    const json = await res.json();
    let rawList: Notice[] = [];

    if (json && json.success && Array.isArray(json.data)) {
      rawList = json.data;
    } else if (Array.isArray(json)) {
      rawList = json;
    } else if (json && Array.isArray(json.data)) {
      rawList = json.data;
    } else {
      return fallbackNotices;
    }

    return rawList.map((item) => ({
      ...item,
      category: normalizeCategory(item.category),
    }));
  } catch (error) {
    console.warn("[Notices API] Could not fetch live notices, using fallback data:", error);
    return fallbackNotices;
  }
}

export async function getNoticeById(id: string): Promise<Notice | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/notices/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const notice = json.data || json;
    if (!notice || !notice.id) return null;

    return {
      ...notice,
      category: normalizeCategory(notice.category),
    };
  } catch (error) {
    console.warn("[Notices API] Failed to fetch single notice:", error);
    return fallbackNotices.find((n) => n.id === id) || null;
  }
}
