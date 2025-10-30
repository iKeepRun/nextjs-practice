import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Event } from '@/database';

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    // Extract and validate slug parameter
    const { slug } = await  params;

    if (!slug  || slug.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing slug parameter' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Query event by slug
    const event = await Event.findOne({ slug: slug.trim() }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json(
      { success: true, data: event },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (use proper logging service in production)
    console.error('Error fetching event by slug:', error);

    // Return generic error response
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while fetching the event',
      },
      { status: 500 }
    );
  }
}
