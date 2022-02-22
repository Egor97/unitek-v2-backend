import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "../auth/dto/create-user.dto";
import {UsersUtils} from "./users.utils";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private usersUtils: UsersUtils) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        try {
            const candidate = await this.getUserByEmail(dto.email);
            if (candidate) {
                throw new BadRequestException(`Пользователь с таким email - ${dto.email} - уже существует`);
            }
            const user = this.usersUtils.getParseUserFromRegistration(dto);
            return await this.userRepository.create(user);
        } catch (e) {
            throw new HttpException('Не удалось создать пользователя', HttpStatus.BAD_REQUEST)
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({where: {email: email}});
    }
}
