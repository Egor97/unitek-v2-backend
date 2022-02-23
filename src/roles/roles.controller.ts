import {Body, Controller, Post} from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {RolesService} from "./roles.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./entities/roles.model";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 201, type: Role})
    @Post('create')
    createRole(@Body() dto: CreateRoleDto): Promise<Role> {
        return this.rolesService.createRole(dto);
    }
}
