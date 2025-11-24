"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
let UploadService = class UploadService {
    configService;
    s3Client;
    bucketName;
    endpoint;
    constructor(configService) {
        this.configService = configService;
        const accessKeyId = this.configService.get('DO_SPACES_KEY');
        const secretAccessKey = this.configService.get('DO_SPACES_SECRET');
        this.endpoint = this.configService.get('DO_SPACES_ENDPOINT');
        this.bucketName = this.configService.get('DO_SPACES_BUCKET');
        const region = this.configService.get('DO_SPACES_REGION');
        if (!accessKeyId ||
            !secretAccessKey ||
            !this.endpoint ||
            !this.bucketName ||
            !region) {
            throw new Error('Digital Ocean Spaces configuration is incomplete');
        }
        this.s3Client = new client_s3_1.S3Client({
            endpoint: this.endpoint,
            region: region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            forcePathStyle: false,
        });
    }
    async uploadSingle(file, folder) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
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
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async uploadMultiple(files, folder) {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('No files provided');
        }
        const uploadPromises = files.map((file) => this.uploadSingle(file, folder));
        const uploadResults = await Promise.all(uploadPromises);
        const totalSize = uploadResults.reduce((sum, result) => sum + result.size, 0);
        return {
            files: uploadResults,
            totalFiles: uploadResults.length,
            totalSize,
        };
    }
    async deleteFile(key) {
        try {
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });
            await this.s3Client.send(command);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to delete file: ${error.message}`);
        }
    }
    async testConnection() {
        try {
            const command = new client_s3_1.ListObjectsV2Command({
                Bucket: this.bucketName,
                MaxKeys: 1,
            });
            await this.s3Client.send(command);
        }
        catch (error) {
            console.error('Connection test failed:', error);
            throw new common_1.InternalServerErrorException(`Connection test failed: ${error.message}`);
        }
    }
    async uploadToSpaces(file, key) {
        try {
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read',
            });
            await this.s3Client.send(command);
            return `${this.endpoint}/${this.bucketName}/${key}`;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to upload file: ${error.message}`);
        }
    }
    generateKey(originalName, folder) {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const extension = originalName.split('.').pop();
        const baseName = originalName.split('.').slice(0, -1).join('.');
        const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
        const fileName = `${sanitizedBaseName}_${timestamp}_${randomString}.${extension}`;
        return folder ? `${folder}/${fileName}` : fileName;
    }
    validateFile(file) {
        const maxSize = 10 * 1024 * 1024;
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
            throw new common_1.BadRequestException('File size exceeds 10MB limit');
        }
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('File type not allowed');
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map