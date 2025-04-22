import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StartupApplicationDto } from './dto';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class StartupService {
  constructor(private prismaService: PrismaService) {}

  async createStartup(dto: StartupApplicationDto) {
    const startup = await this.prismaService.startup.create({
      data: {
        name: dto.name,
        dataPrivacy: Boolean(dto.dataPrivacy),
        links: dto.links,
        groupName: dto.groupName,
        universityName: dto.universityName,
        eligibility: Boolean(dto.eligibility),
        user: {
          connect: { id: Number(dto.userId) },
        },
      },
    });
    return startup;
  }

  async findStartupById(startupId: number) {
    //const startup = await this.prismaService.startup.findUnique({});
  }
}
