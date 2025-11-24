export declare class UploadResponseDto {
    key: string;
    url: string;
    originalName: string;
    mimeType: string;
    size: number;
    uploadedAt: Date;
}
export declare class MultipleUploadResponseDto {
    files: UploadResponseDto[];
    totalFiles: number;
    totalSize: number;
}
