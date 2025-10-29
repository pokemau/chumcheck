import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { UploadResponseDto, MultipleUploadResponseDto } from './dto';

@Injectable()
export class UploadService {
  private s3Client?: S3Client;
  private bucketName?: string;
  private endpoint?: string;
  private enabled = false;

  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('DO_SPACES_KEY');
    const secretAccessKey = this.configService.get<string>('DO_SPACES_SECRET');
    this.endpoint = this.configService.get<string>('DO_SPACES_ENDPOINT') || undefined;
    this.bucketName = this.configService.get<string>('DO_SPACES_BUCKET') || undefined;
    const region = this.configService.get<string>('DO_SPACES_REGION');

    if (
      accessKeyId &&
      secretAccessKey &&
      this.endpoint &&
      this.bucketName &&
      region
    ) {
      this.s3Client = new S3Client({
        endpoint: this.endpoint,
        region: region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        forcePathStyle: false,
      });
      this.enabled = true;
    } else {
      // Missing configuration: keep service disabled but do not crash the app
      this.enabled = false;
      // Optional: console.warn for visibility
      // eslint-disable-next-line no-console
      console.warn('UploadService disabled: DigitalOcean Spaces config is incomplete');
    }
  }

  async uploadSingle(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<UploadResponseDto> {
    try {
      if (!this.enabled) {
        throw new InternalServerErrorException('Upload service is not configured');
      }

      if (!file) {
        throw new BadRequestException('No file provided');
      }

      this.validateFile(file);

      const key = this.generateKey(file.originalname, folder);
      const url = await this.uploadToSpaces(file, key);

      return {
        key,
        url,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        uploadedAt: new Date(),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async uploadMultiple(
    files: Express.Multer.File[],
    folder?: string,
  ): Promise<MultipleUploadResponseDto> {
    if (!this.enabled) {
      throw new InternalServerErrorException('Upload service is not configured');
    }

    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const uploadPromises = files.map((file) => this.uploadSingle(file, folder));
    const uploadResults = await Promise.all(uploadPromises);

    const totalSize = uploadResults.reduce(
      (sum, result) => sum + result.size,
      0,
    );

    return {
      files: uploadResults,
      totalFiles: uploadResults.length,
      totalSize,
    };
  }

  async deleteFile(key: string): Promise<void> {
    if (!this.enabled) {
      throw new InternalServerErrorException('Upload service is not configured');
    }

    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName!,
        Key: key,
      });

      await this.s3Client!.send(command);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete file: ${error.message}`,
      );
    }
  }

  async testConnection(): Promise<void> {
    if (!this.enabled) {
      // Silent no-op to avoid crashing health checks when unconfigured
      return;
    }

    try {
      const { ListObjectsV2Command } = await import('@aws-sdk/client-s3');
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName!,
        MaxKeys: 1,
      });

      await this.s3Client!.send(command);
    } catch (error) {
      console.error('Connection test failed:', error);
      throw new InternalServerErrorException(
        `Connection test failed: ${error.message}`,
      );
    }
  }

  private async uploadToSpaces(
    file: Express.Multer.File,
    key: string,
  ): Promise<string> {
    if (!this.enabled) {
      throw new InternalServerErrorException('Upload service is not configured');
    }

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      });

      await this.s3Client!.send(command);

      return `${this.endpoint}/${this.bucketName}/${key}`;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to upload file: ${error.message}`,
      );
    }
  }

  private generateKey(originalName: string, folder?: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    const baseName = originalName.split('.').slice(0, -1).join('.');

    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `${sanitizedBaseName}_${timestamp}_${randomString}.${extension}`;

    return folder ? `${folder}/${fileName}` : fileName;
  }

  private validateFile(file: Express.Multer.File): void {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 10MB limit');
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('File type not allowed');
    }
  }
}
