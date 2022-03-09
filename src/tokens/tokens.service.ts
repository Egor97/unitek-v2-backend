import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Token} from "./entities/token.model";
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/entities/users.model";

@Injectable()
export class TokensService {
    constructor(@InjectModel(Token) private tokenRepository: typeof Token,
                private jwtService: JwtService) {}

    async createRefreshToken(user: User): Promise<Token> {
        const token = this.generateRefreshToken(user);
        try {
            return await this.tokenRepository.create(token);
        } catch (e) {
            throw new HttpException('Не удалось создать токен авторизации', 501);
        }
    }

    async generateAccessToken(user: User): Promise<{ accessToken: string }> {
        const accessPayload = {email: user.email, uuid: user.uuid}
        return {
            accessToken: this.jwtService.sign(accessPayload)
        }
    }

    private async generateRefreshToken(user: User): Promise<string> {
        const refreshPayload = {uuid: user.uuid, email: user.email, password: user.password}
        return this.jwtService.sign(refreshPayload)

    }
}
