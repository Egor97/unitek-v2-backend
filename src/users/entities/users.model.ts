import {BelongsToMany, Column, Comment, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {Role} from "../../roles/entities/roles.model";
import {UserRoles} from "../../roles/entities/user-roles.model";
import {Token} from "../../tokens/entities/token.model";

interface UserCreationAttrs {
    uuid: string;
    email: string;
    password: string;
}

@ApiTags('Пользователи')
@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: '7b101fcc-1ba3-4aea-8c4e-11726ae7876c', description: 'Идентификатор пользователя'})
    @Comment("Идентификатор пользователя")
    @Column({type: DataType.STRING, unique: true, primaryKey: true})
    uuid: string;

    @ApiProperty({example: "user@mail.com", description: "Почтовый адрес пользователя"})
    @Comment("Email пользователя")
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'hashPropertySecure', description: 'Пароль пользователя (Хранится в хешированной функции)'})
    @Comment("Пароль пользователя (Хранится в хешированной функции)")
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'Ivan', description: 'Имя пользователя'})
    @Comment("Имя пользователя")
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'Ivanov', description: 'Фамилия пользователя'})
    @Comment("Фамилия пользователя")
    @Column({type: DataType.STRING, allowNull: false})
    lastname: string;

    @ApiProperty({example: '8 999 999 99 99', description: 'Контактный телефон пользователя'})
    @Comment("Контактный телефон пользователя")
    @Column({type: DataType.STRING, allowNull: true, defaultValue: ''})
    phone: string;

    @ApiProperty({example: 'USER', description: 'Храним роли пользователя'})
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    // @ApiProperty({example: 'USER', description: 'Храним токен пользователя'})
    // @HasOne(() => Token)
    // token: string;
}
