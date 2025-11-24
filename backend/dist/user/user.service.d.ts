import { EntityManager } from '@mikro-orm/postgresql';
import { Role } from 'src/entities/enums/role.enum';
import { User } from 'src/entities/user.entity';
export declare class UserService {
    private em;
    constructor(em: EntityManager);
    findAll(): Promise<import("@mikro-orm/postgresql").Loaded<User, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    findOneById(id: number): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    getUserByRole(userRole: Role): Promise<import("@mikro-orm/postgresql").Loaded<User, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    getUserByString(query: string): Promise<import("@mikro-orm/postgresql").Loaded<User, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    update(id: number, data: Partial<User>): Promise<User | null>;
    remove(id: number): Promise<void>;
}
