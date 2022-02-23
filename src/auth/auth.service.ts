import {BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {LoginUserDto} from "./dto/login-user.dto";
import {User} from "../users/entities/users.model";
import * as bcrypt from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    async registration(dto: CreateUserDto): Promise<{ accessToken: string, refreshToken: string }> {

        const candidate = await this.usersService.getUserByEmail(dto.email);
        if (candidate) {
            throw new BadRequestException(`Пользователь с email ${dto.email} - уже существует`);
        }

        try {
            const hashPassword = await bcrypt.hash(dto.password, 5);
            const user = await this.usersService.createUser({...dto, password: hashPassword});
            return this.generateToken(user);
        } catch (e) {
            throw new HttpException('Не удалось создать пользователя', HttpStatus.BAD_REQUEST)
        }
    }

    async login(dto: LoginUserDto): Promise<{ accessToken: string, refreshToken: string }> {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }

    private async generateToken(user: User): Promise<{accessToken: string, refreshToken: string}> {
        // add refresh token
        //roles: user.roles add in payload
        const accessPayload = {email: user.email, uuid: user.uuid}
        const refreshPayload = {uuid: user.uuid, email: user.email, password: user.password}
        return {
            accessToken: this.jwtService.sign(accessPayload),
            refreshToken: this.jwtService.sign(refreshPayload)
        }
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

    async verifyToken(token: string)  {
        return this.jwtService.verify(token);
    }
}
