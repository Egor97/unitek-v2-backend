import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Указываем роль'})
    readonly value: string;

    @ApiProperty({example: '210b693a-642e-4eab-9eb8-466eb1aaffe0',
        description: 'Указываем уникальный идентификатор пользователя'})
    readonly userId: string;
}
