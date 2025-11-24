import { Role } from '../../entities/enums/role.enum';
export declare class CreateUserDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: Role;
}
