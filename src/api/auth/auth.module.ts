import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [UsersModule,
        PassportModule,
        JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, JWTStrategy, LocalStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
