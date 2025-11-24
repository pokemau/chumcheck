import { UserService } from './user.service';
import { Role } from 'src/entities/enums/role.enum';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(userRole: Role): Promise<import("@mikro-orm/core").Loaded<import("../entities/user.entity").User, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    getUserByString(query: string): Promise<import("@mikro-orm/core").Loaded<import("../entities/user.entity").User, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
}
