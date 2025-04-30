import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { readFile } from 'fs/promises';

import * as PdfParse from 'pdf-parse';
import { AiService } from 'src/ai/ai.service';
import { StartupApplicationDto } from './dto';
import { StartupService } from './startup.service';
import { JwtGuard } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@UseGuards(JwtGuard)
@Controller('startups')
export class StartupController {
  constructor(
    private startupService: StartupService,
    private aiService: AiService,
  ) {}

  @Get('/startups')
  getStartups(@Req() req: any) {
    return this.startupService.getStartups(req.user.id);
  }

  @Get('/ranking-by-urat/')
  async getStartupsByUrat() {
    return await this.startupService.getPendingStartupsRankingByUrat();
  }

  @Get('/ranking-by-rubrics/')
  async getStartupsByRubrics() {
    return await this.startupService.getPendingStartupsRankingByUrat();
  }

  @Post('/create-startup')
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

  @Get(':startupId')
  async getStartupById(@Param('startupId') startupId: string) {
    const id = Number(startupId);
    if (isNaN(id)) throw new BadRequestException('Invalid Startup ID');
    return await this.startupService.getStartupById(id);
  }

  @Get(':startupId/calculator-final-scores')
  async getCalculatorFinalScores(@Param('startupId') startupId: number) {
    return await this.startupService.getCalculatorFinalScores(startupId);
  }
}
