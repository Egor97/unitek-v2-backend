import { Module } from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UsersService} from "../users/users.service";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    exports: [],
    imports: [
        UsersService
    ]
})
export class AuthModule {}
