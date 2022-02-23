import {forwardRef, Module} from '@nestjs/common';
import {RolesController} from "./roles.controller";
import {RolesService} from "./roles.service";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/entities/users.model";
import {Role} from "./entities/roles.model";
import {UserRoles} from "./entities/user-roles.model";

@Module({
    providers: [RolesService],
    controllers: [RolesController],
    imports: [
        forwardRef(() => UsersModule),
        SequelizeModule.forFeature([User, Role, UserRoles])
    ],
    exports: [
        RolesService
    ]
})
export class RolesModule {}
