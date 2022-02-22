import {Column, Comment, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: "users"})
export class User extends Model<User> {

    @Comment("Идентификатор пользователя")
    @Column({type: DataType.STRING, unique: true, primaryKey: true})
    uuid: string;

    @Comment("Email пользователя")
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Comment("Пароль пользователя (Хранится в хешированной функции)")
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Comment("Имя пользователя")
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Comment("Фамилия пользователя")
    @Column({type: DataType.STRING, allowNull: false})
    lastname: string;

    @Comment("Контактный телефон пользователя")
    @Column({type: DataType.STRING, allowNull: false})
    phone: string;
}
