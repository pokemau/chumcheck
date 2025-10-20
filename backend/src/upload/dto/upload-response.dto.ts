import { IsString, IsNumber, IsDate } from 'class-validator';

export class UploadResponseDto {
  @IsString()
  key: string;

  @IsString()
  url: string;

  @IsString()
  originalName: string;

  @IsString()
  mimeType: string;

  @IsNumber()
  size: number;

  @IsDate()
  uploadedAt: Date;
}

export class MultipleUploadResponseDto {
  files: UploadResponseDto[];

  @IsNumber()
  totalFiles: number;

  @IsNumber()
  totalSize: number;
}
