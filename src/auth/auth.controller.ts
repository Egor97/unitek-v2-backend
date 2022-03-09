import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiResponse({status: 201, type: Boolean})
    @Post('registration')
    registration(@Body() dto: CreateUserDto): Promise<boolean> {
        return this.authService.registration(dto);
    }

    @ApiOperation({summary: "Авторизация пользователя"})
    @ApiResponse({status: 201, type: String, description: 'Токен доступа'})
    @Post('login')
    login(@Body() dto: LoginUserDto): Promise<{ accessToken: string }> {
        return this.authService.login(dto);
    }

    @ApiOperation({summary: 'Проверка текущего пользователя'})
    @ApiResponse({status: 201, type: Boolean, description: ''})
    @Post('check')
    check(@Body() dto: LoginUserDto): Promise<boolean> {
        return this.authService.check(dto);
    }

    access() {}

    @ApiOperation({summary: 'Выход'})
    @ApiResponse({status: 201, description: 'Выход из учетной записи'})
    @Post('logout')
    logout() {
        this.authService.logout();
    }
}
