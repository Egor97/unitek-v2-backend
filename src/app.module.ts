import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users/entities/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/entities/roles.model";
import {UserRoles} from "./roles/entities/user-roles.model";
import {Token} from "./tokens/entities/token.model";
import { TokensModule } from './tokens/tokens.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_HOST),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_NAME,
          models: [User, Role, UserRoles, Token],
          autoLoadModels: true
      }),
      AuthModule,
      RolesModule,
      UsersModule,
      TokensModule
  ],

})
export class AppModule {}
