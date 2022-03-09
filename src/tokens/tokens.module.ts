import { Module } from '@nestjs/common';
import {TokensService} from "./tokens.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Token} from "./entities/token.model";
import {JwtModule} from "@nestjs/jwt";
import {TokensController} from "./tokens.controller";

@Module({
    providers: [TokensService],
    controllers: [TokensController],
    imports:[
        SequelizeModule.forFeature([Token]),
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'SECRET',
            signOptions: {
                expiresIn: process.env.EXPIRESIN || '24h'
            }
        })
    ],
    exports: [
        TokensService,
        JwtModule
    ]
})
export class TokensModule {}
