import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {User} from "./entities/users.model";
import {Roles} from "../roles/decorators/roles.decorator";
import {JwtAuthGuard} from "../tokens/guards/jwt-auth.guard";
import {AddRoleDto} from "./dto/add-role.dto";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'Получение пользователя по уникальному идентификатору'})
    @ApiResponse({status: 200, type: User})
    // @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Get(':id')
    getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers(): Promise<Array<User>> {
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'Добавление пользователю роли'})
    @ApiResponse({status: 200, type: User})
    @Post('role')
    addRole(@Body() dto: AddRoleDto): Promise<User> {
        return this.userService.addRole(dto);
    }
}
