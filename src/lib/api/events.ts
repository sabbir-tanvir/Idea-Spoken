const BASE_URL = process.env.BASE_URL;

export interface ApiEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: string;
  registrationUrl: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EventsApiResponse {
  success: boolean;
  count: number;
  data: ApiEvent[];
}

export async function getEvents(): Promise<ApiEvent[]> {
  try {
    const response = await fetch(`${BASE_URL}/events`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error("Events API error:", response.status);
      return [];
    }

    const data: EventsApiResponse = await response.json();

    if (data.success) {
      return data.data.filter((event) => event.active);
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}
