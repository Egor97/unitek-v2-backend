import {Body, Controller, Get, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiResponse({status: 201, type: String, description: 'Токен доступа'})
    @Post('registration')
    registration(@Body() dto: CreateUserDto): Promise<{ accessToken: string, refreshToken: string }> {
        return this.authService.registration(dto);
    }

    @ApiOperation({summary: "Авторизация пользователя"})
    @ApiResponse({status: 201, type: String, description: 'Токен доступа'})
    @Post('login')
    login(@Body() dto: LoginUserDto): Promise<{ accessToken: string, refreshToken: string }> {
        return this.authService.login(dto);
    }
}
