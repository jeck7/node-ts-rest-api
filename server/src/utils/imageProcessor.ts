import sharp from 'sharp';
import path from 'path';

export async function processAvatar(inputPath: string, outputPath: string): Promise<void> {
  try {
    await sharp(inputPath)
      .resize(200, 200, {
        fit: 'cover', // Изрязва до квадрат, запазвайки центъра
        position: 'center'
      })
      .jpeg({ quality: 85 }) // Оптимизиране за web
      .toFile(outputPath);
  } catch (error) {
    console.error('Error processing avatar:', error);
    throw new Error('Failed to process image');
  }
}

export async function processAvatarBuffer(buffer: Buffer): Promise<Buffer> {
  try {
    return await sharp(buffer)
      .resize(200, 200, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85 })
      .toBuffer();
  } catch (error) {
    console.error('Error processing avatar buffer:', error);
    throw new Error('Failed to process image');
  }
} 