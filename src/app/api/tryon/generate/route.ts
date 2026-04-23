import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/tryon/generate
 * 
 * Proxies the try-on request to the FastAPI backend.
 * Accepts person_image and cloth_image as FormData.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const personImage = formData.get('person_image') as File | null;
    const clothImage = formData.get('cloth_image') as File | null;

    if (!personImage || !clothImage) {
      return NextResponse.json(
        { error: 'Both person_image and cloth_image are required.' },
        { status: 400 }
      );
    }

    // Forward to FastAPI backend
    const backendUrl = process.env.TRYON_BACKEND_URL || 'http://localhost:8000';
    const backendFormData = new FormData();
    backendFormData.append('person_image', personImage);
    backendFormData.append('cloth_image', clothImage);

    const response = await fetch(`${backendUrl}/api/tryon`, {
      method: 'POST',
      body: backendFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.detail || 'Backend processing failed.' },
        { status: response.status }
      );
    }

    // Rewrite the image URL to include backend origin
    if (data.generated_image_url) {
      data.generated_image_url = `${backendUrl}${data.generated_image_url}`;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Try-on proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to try-on backend. Make sure it is running on port 8000.' },
      { status: 502 }
    );
  }
}
