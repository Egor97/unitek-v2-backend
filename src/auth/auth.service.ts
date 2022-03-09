import {BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {LoginUserDto} from "./dto/login-user.dto";
import {User} from "../users/entities/users.model";
import * as bcrypt from 'bcryptjs';
import {TokensService} from "../tokens/tokens.service";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private tokensService: TokensService) {}

    async registration(dto: CreateUserDto): Promise<boolean> {

        const candidate = await this.usersService.getUserByEmail(dto.email);
        if (candidate) {
            throw new BadRequestException(`Пользователь с email уже существует`);
        }
        try {
            const hashPassword = await bcrypt.hash(dto.password, 5);
            const user = await this.usersService.createUser({...dto, password: hashPassword});
            if (user) {
                return true;
            }
            return false;
        } catch (e) {
            if (await this.usersService.getUserByEmail(dto.email)) {
                await this.usersService.deleteUser(dto.email);
            }
            throw new HttpException('Не удалось создать пользователя', HttpStatus.BAD_REQUEST)
        }
    }

    async login(dto: LoginUserDto): Promise<{ accessToken: string }> {
        const user = await this.validateUser(dto);
        const refreshToken = await this.tokensService.createRefreshToken(user);
        // if (refreshToken) {
        //     await user.$add('token', refreshToken.token);
        // }
        return this.tokensService.generateAccessToken(user);
    }

    async check(dto: LoginUserDto): Promise<boolean> {
        const user = await this.usersService.getUserByEmail(dto.email);

        if (user) {
            return true;
        }
        
        return false;
    }

    async logout() {
        return
    }

    private async validateUser(userDto: LoginUserDto): Promise<User> {
        const user = await this.usersService.getUserByEmail(userDto.email);
        if (!user) {
            throw new BadRequestException('Пользователя с таким email не существует');
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: 'Email или пароль не совпадают'});
    }
}
