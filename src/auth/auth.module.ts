import { Module } from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UsersModule} from "../users/users.module";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    exports: [],
    imports: [
        UsersModule
    ]
})
export class AuthModule {}
