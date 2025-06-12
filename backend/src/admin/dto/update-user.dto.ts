import { IsEmail, IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../entities/enums/role.enum'; // Adjust path as needed

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string; // Password is optional on update

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
