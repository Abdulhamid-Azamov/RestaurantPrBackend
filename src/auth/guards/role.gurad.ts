import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const user = request.user as { id: string, username: string, role: string }

        if (!user) throw new ForbiddenException('Ruxsat yo\'q!')
        if (user.role !== 'admin') throw new ForbiddenException('Faqat adminlar uchun!')
        return true
    }
}