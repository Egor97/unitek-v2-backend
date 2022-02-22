import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    registration(dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }
}
