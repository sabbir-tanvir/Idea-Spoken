import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/auth/session';

const BASE_URL = process.env.BASE_URL;

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ lessonId: string }> }
) {
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { lessonId } = await context.params;
  if (!lessonId) {
    return NextResponse.json(
      { success: false, message: 'Lesson id is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${BASE_URL}/quizzes/results/lesson/${lessonId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Quiz result proxy failed:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch quiz results' },
      { status: 500 }
    );
  }
}
