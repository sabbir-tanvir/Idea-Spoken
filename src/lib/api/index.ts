import data from './data.json';

// Types derived from the data structure for type safety
export interface HeroData {
    titlePrefix: string;
    titleName: string;
    description: string;
    badges: Array<{
        text: string;
        hasDot?: boolean;
        icon?: string;
    }>;
    backgroundImage: string;
    foregroundImage: string;
}

export interface EnglishDebateData {
    badge: string;
    title: string;
    description: string;
    videoThumbnail: string;
    lessons: string;
    duration: string;
    students: string;
    price: string;
    philosophy: {
        title: string;
        description: string;
    };
    learningOutcomes: {
        id: number;
        text: string;
        icon: string;
        color: string;
    }[];
}

export interface Workshop {
    id: number;
    title: string;
    date: string;
    location: string;
    participants: string;
}

/**
 * Simulates a network delay to mimic a real API call.
 * @param ms milliseconds to wait
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches hero section data.
 */
export async function getHeroData(): Promise<HeroData> {
    // Simulate API call
    await delay(200);
    return data.hero;
}

/**
 * Fetches upcoming workshops data.
 */
export async function getWorkshopsData(): Promise<Workshop[]> {
    // Simulate API call
    await delay(200);
    return data.upcomingWorkshops;
}

/**
 * Fetches English Debate course data.
 */
export async function getEnglishDebateData(): Promise<EnglishDebateData> {
    await delay(200);
    return data.englishDebate;
}

/**
 * Generic fetch function for getting the entire data object or parts of it.
 * Use this if you need more flexibility.
 */
export async function getFullMockData() {
    await delay(200);
    return data;
}
