import { UploadService } from './upload.service';
import { UploadResponseDto, MultipleUploadResponseDto } from './dto';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    testConnection(): Promise<{
        message: string;
        status: string;
    }>;
    uploadSingle(file: Express.Multer.File, folder?: string): Promise<UploadResponseDto>;
    uploadMultiple(files: Express.Multer.File[], folder?: string): Promise<MultipleUploadResponseDto>;
}
