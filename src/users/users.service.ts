import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./entities/users.model";
import {CreateUserDto} from "../auth/dto/create-user.dto";
import { v4 as uuid } from 'uuid';
import {AddRoleDto} from "./dto/add-role.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        return await this.userRepository.create({...dto, uuid: uuid()});
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({where: {email: email}});
    }

    async getAllUsers(): Promise<Array<User>> {
        return await this.userRepository.findAll({include: {all: true}});
    }

    async getUserById(id: string): Promise<User> {
        return await this.userRepository.findByPk(id, {include: {all: true}});
    }

    async addRole(dto: AddRoleDto): Promise<User> {
        const user = await this.getUserById(dto.userId);
        const role = await this.roleService.findRoleByValue(dto.value);

        if (user && role) {
            await user.$add('role', role.id);
            return user;
        }
    }

    async deleteUser(email: string): Promise<void> {
        const user = await this.getUserByEmail(email);
        return await user.destroy();
    }
}

