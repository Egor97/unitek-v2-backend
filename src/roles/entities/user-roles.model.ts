import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {User} from "../../users/entities/users.model";

@Table({tableName: 'user-roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({description: "Внешний идентификатор роли"})
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ApiProperty({description: "Внешний идентификатор пользователя"})
    @ForeignKey(() => User)
    @Column({type: DataType.STRING})
    userId: string;
}
