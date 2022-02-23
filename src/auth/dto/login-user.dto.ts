import {IsEmail, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({example: 'user@mail.com', description:'Почтовый адрес пользователя'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @ApiProperty({example: 'password_1234', description: 'Пароль пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly password: string;
}
