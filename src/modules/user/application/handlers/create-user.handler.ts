import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../commands/create-user.command";
import { UserService } from "../services/user.service";
import { User } from "@modules/user/domain/entities/user.entity";
import { plainToInstance } from "class-transformer";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(private readonly userService: UserService) {}

    async execute(command: CreateUserCommand): Promise<Partial<User> & User> {
        const user:User = plainToInstance(User, command)
        return this.userService.createUser(user)
    }
}