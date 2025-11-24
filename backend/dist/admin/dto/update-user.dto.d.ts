import { Role } from '../../entities/enums/role.enum';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
}
