import {Column, Comment, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: "users"})
export class User extends Model<User> {

    @Column({type: DataType.STRING, unique: true, autoIncrement: true, primaryKey: true})
    @Comment("Идентификатор пользователя")
    id: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    @Comment("Email пользователя")
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    @Comment("Пароль пользователя (Хранится в хешированной функции)")
    password: string;

    @Column({type: DataType.STRING, allowNull: false})
    @Comment("Имя пользователя")
    name: string;
    @Column({type: DataType.STRING, allowNull: false})
    @Comment("Фамилия пользователя")
    lastname: string;

    @Column({type: DataType.STRING, allowNull: false})
    @Comment("Контактный телефон пользователя")
    phone: string;
}
