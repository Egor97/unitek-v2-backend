import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./entities/users.model";
import {UserRoles} from "../roles/entities/user-roles.model";
import {Role} from "../roles/entities/roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {TokensModule} from "../tokens/tokens.module";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
      TokensModule,
      forwardRef(() => RolesModule),
      forwardRef(() => AuthModule),
      SequelizeModule.forFeature([User, Role, UserRoles])
  ],
  exports: [
      UsersService
  ]
})
export class UsersModule {}
