import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Role } from '../../entities/enums/role.enum';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.session?.user;

    if (!user) {
      throw new UnauthorizedException('Please log in to access admin panel');
    }

    // Check if user has Manager role (admin access)
    if (user.role !== Role.Manager) {
      throw new UnauthorizedException('Access denied. Admin privileges required.');
    }

    // Add user to request for easy access in controllers
    request.user = user;
    return true;
  }
}
