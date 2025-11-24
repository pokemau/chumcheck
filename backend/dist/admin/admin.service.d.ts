import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { StartupService } from '../startup/startup.service';
import { Startup } from '../entities/startup.entity';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';
import { EntityManager } from '@mikro-orm/core';
export declare class AdminService {
    private readonly userService;
    private readonly authService;
    private readonly startupService;
    private readonly em;
    constructor(userService: UserService, authService: AuthService, startupService: StartupService, em: EntityManager);
    private log;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: number): Promise<void>;
    getAllStartups(): Promise<Startup[]>;
    getStartupById(id: number): Promise<Startup>;
    createStartup(createStartupDto: CreateStartupDto): Promise<Startup>;
    updateStartup(id: number, updateStartupDto: UpdateStartupDto): Promise<Startup>;
    deleteStartup(id: number): Promise<void>;
}
