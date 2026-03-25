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
    skillsHighlights: {
        id: number;
        title: string;
        description: string;
        icon: string;
    }[];
    courseModules: {
        id: number;
        title: string;
        prefix?: string;
        isLocked: boolean;
        previewLabel?: string;
    }[];
    offer: {
        title: string;
        subtitle: string;
        originalPrice: string;
        discountedPrice: string;
        paymentText: string;
        buttonText: string;
    };
}

export interface CourseCardData {
    tag: string;
    slug?: string;
    rating: number;
    reviewCount: string;
    title: string;
    description: string;
    price: string;
    lessons: string;
    duration: string;
    students: string;
    features: string[];
    instructor: {
        name: string;
        avatar: string;
    };
    image: string;
}

export interface AboutData {
    title: string;
    subtitle: string;
    description: string;
    mission: {
        title: string;
        text: string;
    };
    vision: {
        title: string;
        text: string;
    };
    yearsExperience: number;
    images: string[];
    buttonText: string;
}

export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    icon: string;
}

export interface ActivitiesData {
    title: string;
    description: string;
    stats: {
        value: string;
        label: string;
        icon: string;
    }[];
}

export interface HomeHeroData {
    tagline: string;
    title: string;
    description: string;
    ctaText: string;
    exploreText: string;
    image: string;
}

export interface WhyIdeaCard {
    id: number;
    title: string;
    description: string;
    icon: string;
    bgColor: string;
}

export interface WhyIdeaData {
    badge: string;
    title: string;
    description: string;
    cards: WhyIdeaCard[];
}

export interface WingCardData {
    id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
}

export interface SevenWingsData {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
    wings: WingCardData[];
}

interface ApiBlogMedia {
    id: number;
    url: string;
    alt?: string;
}

interface ApiBlog {
    id: number;
    title: string;
    slug: string;
    description: string;
    published: boolean;
    coverImage: ApiBlogMedia | null;
}

interface BlogsApiResponse {
    success: boolean;
    count: number;
    data: ApiBlog[];
}

export interface TopCoursesData {
    badge: string;
    title: string;
    buttonText: string;
    courses: CourseCardData[];
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
 * Fetches featured course data for the card.
 */
export async function getFeaturedCourse(): Promise<CourseCardData> {
    await delay(200);
    return data.featuredCourse;
}

/**
 * Fetches about page data.
 */
export async function getAboutData(): Promise<AboutData> {
    await delay(200);
    return data.about;
}

/**
 * Fetches timeline data.
 */
export async function getTimelineData(): Promise<TimelineEvent[]> {
    await delay(200);
    return data.timeline;
}

/**
 * Fetches activities/stats data.
 */
export async function getActivitiesData(): Promise<ActivitiesData> {
    await delay(200);
    return data.activities;
}

/**
 * Fetches home hero data.
 */
export async function getHomeHeroData(): Promise<HomeHeroData> {
    await delay(200);
    return data.homeHero;
}

/**
 * Fetches Why IDEA section data.
 */
export async function getWhyIdeaData(): Promise<WhyIdeaData> {
    await delay(200);
    return data.whyIdea;
}

/**
 * Fetches 7 Wings section data.
 */
export async function getSevenWingsData(): Promise<SevenWingsData> {
    const fallback = data.sevenWings as SevenWingsData;

    try {
        const apiBase = (
            process.env.BASE_URL
            ?? `${process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://idea-backend-03b4.onrender.com"}/api/v1`
        ).replace(/\/+$/, "");

        const backendOrigin = apiBase.replace(/\/api\/v\d+\/?$/, "");

        const response = await fetch(`${apiBase}/blogs`, {
            next: { revalidate: 60 },
        });

        if (!response.ok) return fallback;

        const payload: BlogsApiResponse = await response.json();
        if (!payload.success || !payload.data?.length) return fallback;

        const routeByBlogSlug: Record<string, string> = {
            "idea-youth-development-center": "/youth-development",
            "idea-social-welfare": "/social-welfare",
            "the-game-method": "/idea-spoken",
            "idea-pitha-pathshala": "/pitha",
            "widen": "/widen",
            "bangla-pitha-research-institute": "/bangla-pitha-research-institute",
            "rise-and-thrive": "/rise-and-thrive",
        };

        const orderBySlug: Record<string, number> = {
            "idea-youth-development-center": 1,
            "idea-social-welfare": 2,
            "the-game-method": 3,
            "idea-pitha-pathshala": 4,
            "widen": 5,
            "bangla-pitha-research-institute": 6,
            "rise-and-thrive": 7,
        };

        const fallbackBySlug = new Map(
            fallback.wings.map((wing) => [wing.slug.replace(/^\//, ""), wing])
        );

        const mappedWings: WingCardData[] = payload.data
            .filter((blog) => blog.published)
            .map((blog) => {
                const route = routeByBlogSlug[blog.slug] ?? "/our-wings";
                const fallbackWing = fallbackBySlug.get(route.replace(/^\//, ""));
                const coverUrl = blog.coverImage?.url;
                const image = coverUrl
                    ? (
                        coverUrl.startsWith("http")
                            ? coverUrl
                            : `${backendOrigin}${coverUrl.startsWith("/") ? "" : "/"}${coverUrl}`
                    )
                    : (fallbackWing?.image ?? "/images/wings/youth-development.jpg");

                return {
                    id: blog.id,
                    title: blog.title || fallbackWing?.title || "Wing",
                    description: blog.description || fallbackWing?.description || "",
                    image,
                    slug: route,
                };
            })
            .sort((a, b) => {
                const aOrder = orderBySlug[a.slug.replace(/^\//, "")] ?? 999;
                const bOrder = orderBySlug[b.slug.replace(/^\//, "")] ?? 999;
                return aOrder - bOrder;
            });

        if (!mappedWings.length) return fallback;

        return {
            ...fallback,
            wings: mappedWings,
        };
    } catch (error) {
        console.error("Failed to fetch seven wings blogs:", error);
        return fallback;
    }
}

/**
 * Fetches Top Courses section data.
 */
export async function getTopCoursesData(): Promise<TopCoursesData> {
    await delay(200);
    return data.topCourses;
}

/**
 * Generic fetch function for getting the entire data object or parts of it.
 * Use this if you need more flexibility.
 */
export async function getFullMockData() {
    await delay(200);
    return data;
}
