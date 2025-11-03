// Image storage utility - supports both local and cloud storage
// Local for development, Cloudinary for production

import { v2 as cloudinary } from 'cloudinary';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Configure Cloudinary (only if credentials exist)
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Local storage directory
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

// Upload image to storage
export async function uploadImage(imageFile: File): Promise<string> {
  // If Cloudinary is configured, use it (production)
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    return uploadToCloudinary(imageFile);
  }
  
  // Otherwise use local storage (development)
  return saveImageToPublic(imageFile);
}

// Cloudinary upload (production)
async function uploadToCloudinary(imageFile: File): Promise<string> {
  try {
    // Convert File to Buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Convert to base64 for Cloudinary
    const base64 = buffer.toString('base64');
    const dataUri = `data:${imageFile.type};base64,${base64}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'ptsltech', // Organize uploads in folder
      resource_type: 'auto', // Auto-detect image/video
    });
    
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to cloud storage');
  }
}

// Local file storage (development)
async function saveImageToPublic(imageFile: File): Promise<string> {
  try {
    // Create unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const filename = `${timestamp}-${randomStr}.${imageFile.name.split('.').pop()}`;
    
    // Create directory if it doesn't exist
    await mkdir(uploadsDir, { recursive: true });
    
    // Convert File to Buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save file
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);
    
    // Return relative path from public folder
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Local upload error:', error);
    throw new Error('Failed to save image locally');
  }
}

// Get storage type (for debugging)
export function getStorageType(): 'local' | 'cloudinary' {
  return process.env.CLOUDINARY_CLOUD_NAME ? 'cloudinary' : 'local';
}

