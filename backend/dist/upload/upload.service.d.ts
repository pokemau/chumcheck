import { ConfigService } from '@nestjs/config';
import { UploadResponseDto, MultipleUploadResponseDto } from './dto';
export declare class UploadService {
    private configService;
    private s3Client;
    private bucketName;
    private endpoint;
    constructor(configService: ConfigService);
    uploadSingle(file: Express.Multer.File, folder?: string): Promise<UploadResponseDto>;
    uploadMultiple(files: Express.Multer.File[], folder?: string): Promise<MultipleUploadResponseDto>;
    deleteFile(key: string): Promise<void>;
    testConnection(): Promise<void>;
    private uploadToSpaces;
    private generateKey;
    private validateFile;
}
