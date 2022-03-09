import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../users/entities/users.model";

interface TokenCreationAttrs {
    token: string;
}

@Table({tableName: 'tokens'})
export class Token extends Model<Token, TokenCreationAttrs> {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор токена'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'eyJhbXVCJ9.eyJlbWFpbCI6MTEzM30.TglynIPHLjgRI3c', description: 'Токен обновления'})
    @Column({type: DataType.STRING, allowNull: false})
    token: string;

    // @ApiProperty({example: '7b101fcc-1ba3-4aea-8c4e-11726ae7876c', description: "Внешний идентификатор пользователя"})
    // @ForeignKey(() => User)
    // userId: string;
}
