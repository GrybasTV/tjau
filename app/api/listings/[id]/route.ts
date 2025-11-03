import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/middleware';

// PATCH - update listing status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Admin authentication check
    const auth = requireAuth(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { status } = await request.json();
    const { id } = await params;
    const listingId = parseInt(id);

    // Validation
    const validStatuses = ['pending', 'contacted', 'purchased', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update listing
    const listing = await prisma.listing.update({
      where: { id: listingId },
      data: { status },
    });

    return NextResponse.json({ success: true, listing });
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json(
      { error: 'An error occurred updating the listing' },
      { status: 500 }
    );
  }
}

// DELETE - delete listing
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Admin authentication check
    const auth = requireAuth(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const listingId = parseInt(id);

    // Delete listing
    await prisma.listing.delete({
      where: { id: listingId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json(
      { error: 'An error occurred deleting the listing' },
      { status: 500 }
    );
  }
}

