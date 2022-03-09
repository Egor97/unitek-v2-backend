import { Module } from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UsersModule} from "../users/users.module";
import {TokensModule} from "../tokens/tokens.module";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        TokensModule,
        UsersModule,
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {}
