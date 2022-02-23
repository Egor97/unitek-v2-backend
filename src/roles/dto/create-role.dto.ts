import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({example: 'ADMIN', description: 'Роль'})
    readonly value: string;

    @ApiProperty({example: 'Адмистратор', description: 'Описание роли'})
    readonly description: string;
}
