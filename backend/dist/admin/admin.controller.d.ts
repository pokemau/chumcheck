import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';
import { EntityManager } from '@mikro-orm/core';
export declare class AdminController {
    private readonly adminService;
    private readonly em;
    constructor(adminService: AdminService, em: EntityManager);
    recentActivity(): Promise<{
        date: string;
        action: string;
        details: string;
    }[]>;
    getUsersJson(): Promise<import("../entities/user.entity").User[]>;
    getUserJson(id: number): Promise<import("../entities/user.entity").User>;
    createUserJson(dto: CreateUserDto): Promise<{
        message: string;
        user: import("../entities/user.entity").User;
    }>;
    updateUserJson(id: number, dto: UpdateUserDto): Promise<{
        message: string;
        user: import("../entities/user.entity").User;
    }>;
    deleteUserJson(id: number): Promise<{
        message: string;
    }>;
    getStartupsJson(): Promise<import("../entities/startup.entity").Startup[]>;
    getStartupJson(id: number): Promise<import("../entities/startup.entity").Startup>;
    createStartupJson(dto: CreateStartupDto): Promise<{
        message: string;
        startup: import("../entities/startup.entity").Startup;
    }>;
    updateStartupJson(id: number, dto: UpdateStartupDto): Promise<{
        message: string;
        startup: import("../entities/startup.entity").Startup;
    }>;
    deleteStartupJson(id: number): Promise<{
        message: string;
    }>;
}
