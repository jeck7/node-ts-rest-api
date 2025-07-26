import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";
import { processAvatar } from "../utils/imageProcessor";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, path.join(__dirname, '../../uploads/avatars'));
  },
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

export const uploadAvatar = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB (увеличавам, защото sharp ще го компресира)
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

// Middleware за обработка на изображението след upload
export const processUploadedAvatar = async (req: Request, res: any, next: any) => {
  try {
    if (!req.file) {
      return next();
    }
    
    const inputPath = req.file.path;
    const outputPath = inputPath.replace(/\.[^/.]+$/, '.jpg'); // Заменяме разширението с .jpg
    
    await processAvatar(inputPath, outputPath);
    
    // Обновяваме file path-а да сочи към обработения файл
    req.file.path = outputPath;
    req.file.filename = path.basename(outputPath);
    
    next();
  } catch (error) {
    console.error('Error processing uploaded avatar:', error);
    res.status(500).json({ message: 'Error processing image' });
  }
}; 