import {
  Controller,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Query,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadResponseDto, MultipleUploadResponseDto } from './dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('test-connection')
  async testConnection(): Promise<{ message: string; status: string }> {
    try {
      await this.uploadService.testConnection();
      return {
        message: 'Digital Ocean Spaces connection successful',
        status: 'connected',
      };
    } catch (error) {
      return {
        message: `Connection failed: ${error.message}`,
        status: 'failed',
      };
    }
  }

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.uploadService.uploadSingle(file, folder);
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder?: string,
  ): Promise<MultipleUploadResponseDto> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    return this.uploadService.uploadMultiple(files, folder);
  }

  // @Delete(':key(*)')
  // async deleteFile(@Param('key') key: string): Promise<{ message: string }> {
  //   if (!key) {
  //     throw new BadRequestException('File key is required');
  //   }
  //
  //   await this.uploadService.deleteFile(key);
  //   return { message: 'File deleted successfully' };
  // }
}
