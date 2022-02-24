import { Module } from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {SequelizeModule} from "@nestjs/sequelize";
import {Token} from "./entities/token.model";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        UsersModule,
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'SECRET',
            signOptions: {
                expiresIn: process.env.EXPIRESIN || '24h'
            }
        }),
        SequelizeModule.forFeature([Token])
    ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
