import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { readFile } from 'fs/promises';

import { Express } from 'express';

import * as PdfParse from 'pdf-parse';
import { AiService } from 'src/ai/ai.service';
import { StartupApplicationDto } from './dto';
import { StartupService } from './startup.service';
import { JwtGuard } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtGuard)
@Controller('startup')
export class StartupController {
  constructor(
    private startupService: StartupService,
    private aiService: AiService,
  ) {}

  @Get('/startups')
  getStartups() {
    return {
      message: 'STARTUPS RAAAAAAAAHHHHHHHHHHHHHHH',
    };
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('capsuleProposal'))
  async createStartup(
    @Body() dto: StartupApplicationDto,
    //@UploadedFile() file: Express.Multer.File,
  ) {
    return await this.startupService.createStartup(dto);
  }

  @Post('/capsule-proposal')
  async getCapsuleProposal() {
    try {
      const dbuffer = await readFile('/home/mau/Downloads/a.pdf');

      const data = await PdfParse(dbuffer);
      let res = await this.aiService.getCapsuleProposalInfo(data.text);

      if (res) {
        // remove trailing ````
        res = res.replace(/^```json\s*/, '').replace(/\s*```$/, '');

        return JSON.parse(res);
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
