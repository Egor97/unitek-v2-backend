import {Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../users/entities/users.model";

@Table({tableName: 'tokens'})
export class Token extends Model<Token> {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор токена'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '', description: 'Токен обновления'})
    @Column({type: DataType.STRING, allowNull: false})
    token: string;

    @ApiProperty({example: '7b101fcc-1ba3-4aea-8c4e-11726ae7876c', description: "Внешний идентификатор пользователя"})
    @ForeignKey(() => User)
    userId: string;
}
