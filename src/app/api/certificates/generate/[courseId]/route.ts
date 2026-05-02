import { NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/auth/session';

const BASE_URL = process.env.BASE_URL;

export async function GET(
  _request: Request,
  context: { params: Promise<{ courseId: string }> }
) {
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { courseId } = await context.params;
  if (!courseId) {
    return NextResponse.json(
      { success: false, message: 'Course id is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${BASE_URL}/certificates/generate/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/pdf')) {
      const buffer = await response.arrayBuffer();
      const headers = new Headers();
      headers.set('Content-Type', contentType);
      headers.set('Content-Disposition', `inline; filename="certificate-${courseId}.pdf"`);
      return new NextResponse(buffer, { status: response.status, headers });
    }

    const data = await response.json().catch(() => ({
      success: false,
      message: 'Unexpected response from certificate API',
    }));

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Certificate generation proxy failed:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}
