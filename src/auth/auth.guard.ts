import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) {}

    async canActivate(
        context: ExecutionContext,
    ):  Promise<boolean> {
        
        try {
            const request = context.switchToHttp().getRequest();
            const authorization = request.headers['authorization'];
            const token = authorization.split(' ')[1];

            if(!token) {
                throw new BadRequestException('Token is required');
            }

            const data = await this.authService.decodeToken(token);
        } catch (e) {
            return false;
        }
        
        return true;
    }
}
