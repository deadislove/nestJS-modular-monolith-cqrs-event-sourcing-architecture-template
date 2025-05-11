import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "./application/services/user.service";
import { UserRepository } from "./infra/repositories/user.repository.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserTypeOrmEntity from "./infra/typeorm/entities/user.orm-entity";
import { CommandHandler } from "./application/handlers";
import { UserController } from "./interfaces/user.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { QueryHandler } from "./application/query-handlers";
import { AuthController } from "./interfaces/auth.controller";
import { AuthModule } from "@modules/auth/auth.module";
import { UserFacade } from "./application/facades/user.facades.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserTypeOrmEntity
        ]),
        CqrsModule,
        forwardRef(() => AuthModule),
    ],
    controllers: [
        UserController,
        AuthController
    ],
    providers: [
        UserService,
        {
            provide: 'IUserRepository',
            useClass: UserRepository
        },
        ...CommandHandler,
        ...QueryHandler,
        UserFacade,
    ],
    exports: [
        UserService,
        UserFacade
    ]
})
export class UserModule {}