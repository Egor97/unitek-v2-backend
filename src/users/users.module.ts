import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./entities/users.entity";
import {UsersUtils} from "./utils/users.utils";

@Module({
  providers: [UsersService, UsersUtils],
  controllers: [UsersController],
  imports: [
      SequelizeModule.forFeature([User])
  ],
  exports: [
      UsersService
  ]
})
export class UsersModule {}
