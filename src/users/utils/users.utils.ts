import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { CreateUserDto } from "../../auth/dto/create-user.dto";
import { CreateUserDbDto } from "../dto/create-user-db.dto";
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersUtils {
    getParseUserFromRegistration(dto: CreateUserDto) {
        const returnedDto = new CreateUserDbDto();
        try {
            returnedDto.uuid = uuid();
            returnedDto.name = dto.name;
            returnedDto.lastname = dto.lastname;
            returnedDto.email = dto.email;
            returnedDto.password = dto.password;

            return returnedDto;
        } catch (e) {
            throw new HttpException('Не удалось создать пользователя', HttpStatus.BAD_GATEWAY);
        }
    }
}
