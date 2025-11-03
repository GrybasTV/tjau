import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { uploadImage } from '@/lib/imageStorage';

// POST - create new listing
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Get form data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const condition = formData.get('condition') as string;
    const contactName = formData.get('contactName') as string;
    const contactEmail = formData.get('contactEmail') as string;
    const contactPhone = formData.get('contactPhone') as string;
    const contactPostcode = formData.get('contactPostcode') as string;

    // Validation
    if (!title || !description || !price || !condition || !contactName || !contactEmail || !contactPhone || !contactPostcode) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // TODO: Add reCAPTCHA verification here

    // Upload images (local in dev, cloud in production)
    const imageFiles = formData.getAll('images') as File[];
    const imageUrls: string[] = [];

    for (const imageFile of imageFiles) {
      if (imageFile && imageFile.size > 0) {
        try {
          // Upload image (local in dev, Cloudinary in production)
          const imageUrl = await uploadImage(imageFile);
          imageUrls.push(imageUrl);
        } catch (imageError) {
          console.error('Image upload error:', imageError);
          // Continue with other images even if one fails
        }
      }
    }

    // Save listing to database
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price,
        condition,
        contactName,
        contactEmail,
        contactPhone,
        contactPostcode,
        images: JSON.stringify(imageUrls),
        status: 'pending',
      },
    });

    return NextResponse.json(
      { success: true, listing },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating listing:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'An error occurred creating the listing. Please try again.' },
      { status: 500 }
    );
  }
}

// GET - fetch all listings (admin only)
export async function GET(request: NextRequest) {
  try {
    // Admin authentication check
    const { requireAuth } = await import('@/lib/middleware');
    const auth = requireAuth(request);
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ listings });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'An error occurred fetching listings' },
      { status: 500 }
    );
  }
}

