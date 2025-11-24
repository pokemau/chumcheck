import { EntityManager } from '@mikro-orm/core';
import { ElevateStartupDto } from './dto';
import { ElevateLogs } from 'src/entities/elevate-log.entity';
export declare class ElevateService {
    private em;
    constructor(em: EntityManager);
    elevate(dto: ElevateStartupDto): Promise<void>;
    getStartupElevateLogs(startupId: number): Promise<import("@mikro-orm/core").Loaded<ElevateLogs, "readinessLevel", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
}
