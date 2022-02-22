import {Body, Controller, Get, Post} from "@nestjs/common";
import {User} from "../users/entities/users.entity";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('registration')
    registration(@Body() dto: CreateUserDto): Promise<User> {
        return this.authService.registration(dto);
    }
}
