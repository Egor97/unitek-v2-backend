import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'Иван', description: 'Имя пользователя'})
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия пользователя'})
    @IsString({message: 'Должно быть строкой'})
    readonly lastname: string;

    @ApiProperty({example: 'password_3948', description: 'Пароль пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly password: string;

    @ApiProperty({example: 'user@mail.com', description: 'Почтовый адрес пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @ApiProperty({example: '9 999 999 99 99', description: 'Контакный телефон пользователя ' +
            '(Необязательное поле)'})
    @IsString({message: 'Должно быть строкой'})
    readonly phone?: string;
}
