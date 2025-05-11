import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "../commands/update-user.command";
import { UserService } from "../services/user.service";
import { plainToInstance } from "class-transformer";
import { User } from "@modules/user/domain/entities/user.entity";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(private readonly userService: UserService) {}

    execute(command: UpdateUserCommand): Promise<boolean> {
        const user: User = plainToInstance(User, command)
        return this.userService.updateUser(user)
    }
}