import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

    private logger = new Logger(RolesGuard.name);

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) return true;
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user?.roles) return false;
        return this.matchRoles(roles, user.roles);
    }

    matchRoles(neededRoles, userRoles): boolean {
        const isAllowed = role => !!userRoles[role];
        for (let i = 0; i < neededRoles.length; i++) {
            const allowed = isAllowed(neededRoles[i]);
            this.logger.debug(`is ${allowed ? '' : 'NOT'} allowed for ${neededRoles[i]} to...`);
            if (allowed) {
                return true;
            }
        }
        return false;
    }

}
