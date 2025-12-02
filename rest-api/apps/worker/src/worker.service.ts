import { Injectable, Logger } from '@nestjs/common';
import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileMessageDto } from './dto/file-message.dto';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);
  private readonly uploadDir = path.join(process.cwd(), 'uploads'); // Simula S3
  private readonly thumbnailDir = path.join(process.cwd(), 'uploads', 'thumbnails');

  constructor() {
    this.ensureDirectoriesExist();
  }

  private async ensureDirectoriesExist() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
      await fs.mkdir(this.thumbnailDir, { recursive: true });
      this.logger.log('Upload directories created/verified');
    } catch (error) {
      this.logger.error('Error creating directories:', error);
    }
  }

  async fileManager(fileData: FileMessageDto) {
    try {
      this.logger.log(`Processing file: ${fileData.originalname}`);

      const buffer = Buffer.from(fileData.buffer, 'base64');

      const fileExtension = path.extname(fileData.originalname);
      const uniqueFileName = `${uuidv4()}${fileExtension}`;
      const thumbnailFileName = `thumb_${uniqueFileName}`;

      const originalPath = path.join(this.uploadDir, uniqueFileName);
      await fs.writeFile(originalPath, buffer);
      this.logger.log(`Original image saved: ${originalPath}`);

      const thumbnailPath = path.join(this.thumbnailDir, thumbnailFileName);
      await sharp(buffer)
        .resize(200, 200, {
          fit: 'cover',
          position: 'center',
        })
        .toFile(thumbnailPath);
      this.logger.log(`Thumbnail created: ${thumbnailPath}`);

      const metadata = await sharp(buffer).metadata();

      const result = {
        success: true,
        originalFile: {
          filename: uniqueFileName,
          path: originalPath,
          size: fileData.size,
          mimetype: fileData.mimetype,
        },
        thumbnail: {
          filename: thumbnailFileName,
          path: thumbnailPath,
        },
        metadata: {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
        },
        urls: {
          original: `/uploads/${uniqueFileName}`,
          thumbnail: `/uploads/thumbnails/${thumbnailFileName}`,
        },
      };

      this.logger.log('File processing completed successfully');
      return result;
    } catch (error) {
      this.logger.error('Error processing file:', error);
      throw error;
    }
  }
}
