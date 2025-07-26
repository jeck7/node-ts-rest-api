import fs from 'fs';
import path from 'path';
import { listUsers } from '../services/userService';

export async function cleanupUnusedAvatars(): Promise<void> {
  try {
    const avatarsDir = path.join(__dirname, '../../uploads/avatars');
    
    // Get all users with their avatar URLs
    const users = await listUsers();
    const usedAvatarUrls = users
      .map(user => user.avatarUrl)
      .filter(url => url && url.startsWith('/uploads/avatars/'))
      .map(url => path.basename(url));

    // Get all files in avatars directory
    if (!fs.existsSync(avatarsDir)) {
      return;
    }

    const files = fs.readdirSync(avatarsDir);
    
    // Delete files that are not used by any user
    for (const file of files) {
      if (!usedAvatarUrls.includes(file)) {
        const filePath = path.join(avatarsDir, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted unused avatar: ${file}`);
      }
    }
  } catch (error) {
    console.error('Error cleaning up avatars:', error);
  }
}

// Function to get disk usage of avatars directory
export function getAvatarsDiskUsage(): { files: number; size: string } {
  try {
    const avatarsDir = path.join(__dirname, '../../uploads/avatars');
    
    if (!fs.existsSync(avatarsDir)) {
      return { files: 0, size: '0 B' };
    }

    const files = fs.readdirSync(avatarsDir);
    let totalSize = 0;

    for (const file of files) {
      const filePath = path.join(avatarsDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    }

    const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
    return { files: files.length, size: `${sizeInMB} MB` };
  } catch (error) {
    console.error('Error getting avatars disk usage:', error);
    return { files: 0, size: '0 B' };
  }
} 