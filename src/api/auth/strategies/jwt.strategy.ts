import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService, private config: ConfigService) {
        super({
            usernameField: 'email',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: any): Promise<any> {
        const userId = payload.sub, username = payload.username;
        // const user = await this.authService.validateJWTUser(username, password);
        // if (!user) {
        //     throw new UnauthorizedException();
        // }
        return { userId: payload.sub, username: payload.username };
    }
}