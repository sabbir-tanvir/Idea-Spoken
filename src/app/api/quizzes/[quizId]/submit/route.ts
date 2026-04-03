import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/auth/session';

const BASE_URL = process.env.BASE_URL;

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ quizId: string }> }
) {
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { quizId } = await context.params;
  if (!quizId) {
    return NextResponse.json(
      { success: false, message: 'Quiz id is required' },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();

    const response = await fetch(`${BASE_URL}/quizzes/${quizId}/submit`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Quiz submit proxy failed:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit quiz answer' },
      { status: 500 }
    );
  }
}
