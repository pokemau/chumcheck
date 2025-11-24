import { ElevateService } from './elevate.service';
import { ElevateStartupDto } from './dto';
export declare class ElevateController {
    private elevateService;
    constructor(elevateService: ElevateService);
    elevateStartupReadinessLevel(dto: ElevateStartupDto): Promise<void>;
    getStartupElevateLogs(startupId: number): Promise<import("@mikro-orm/core").Loaded<import("../entities/elevate-log.entity").ElevateLogs, "readinessLevel", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
}
