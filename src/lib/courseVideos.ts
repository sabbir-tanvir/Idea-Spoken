export interface CourseVideoConfig {
  libraryId: string;
  videoId: string;
  playerUrl: string;
  embedUrl: string;
  title: string;
}

export const COURSE_HERO_VIDEOS: Record<number, CourseVideoConfig> = {
  // Public Speaking Course (ID: 2)
  2: {
    libraryId: '738203',
    videoId: '6dd621e1-5dfe-47bb-a345-7bac7e8eb19c',
    playerUrl: 'https://player.mediadelivery.net/play/738203/6dd621e1-5dfe-47bb-a345-7bac7e8eb19c',
    embedUrl: 'https://iframe.mediadelivery.net/embed/738203/6dd621e1-5dfe-47bb-a345-7bac7e8eb19c',
    title: 'Public Speaking Course Promo',
  },
  // IDEA Debating Society (ID: 3)
  3: {
    libraryId: '738203',
    videoId: '5c12fc44-749e-4f78-a5a3-7a43319d2332',
    playerUrl: 'https://player.mediadelivery.net/play/738203/5c12fc44-749e-4f78-a5a3-7a43319d2332',
    embedUrl: 'https://iframe.mediadelivery.net/embed/738203/5c12fc44-749e-4f78-a5a3-7a43319d2332',
    title: 'Debating Society Course Promo',
  },
};

/**
 * Returns the video configuration for a given course ID or title.
 */
export function getCourseHeroVideo(courseId?: number | null, title?: string | null): CourseVideoConfig | null {
  if (courseId && COURSE_HERO_VIDEOS[courseId]) {
    return COURSE_HERO_VIDEOS[courseId];
  }
  if (title) {
    const t = title.toLowerCase();
    if (t.includes('speaking') || t.includes('spoken') || t.includes('public')) {
      return COURSE_HERO_VIDEOS[2];
    }
    if (t.includes('debat')) {
      return COURSE_HERO_VIDEOS[3];
    }
  }
  return null;
}
