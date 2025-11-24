import { Collection } from '@mikro-orm/core';
import { Role } from './enums/role.enum';
import { Startup } from './startup.entity';
import { Roadblock } from './roadblock.entity';
import { Rns } from './rns.entity';
export declare class User {
    id: number;
    email: string;
    hash: string;
    firstName?: string;
    lastName?: string;
    role: Role;
    assignedRoadblocks: Collection<Roadblock, object>;
    startups: Collection<Startup, object>;
    startupsAsMember: Collection<Startup, object>;
    assignedRns: Collection<Rns, object>;
}
