import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ManagerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
