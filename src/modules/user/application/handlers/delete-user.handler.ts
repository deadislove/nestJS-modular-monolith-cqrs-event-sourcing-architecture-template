import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteUserCommand } from "../commands/delete-user.command";
import { UserService } from "../services/user.service";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    constructor(private readonly userService: UserService){}

    execute(command: DeleteUserCommand): Promise<any> {
        return this.userService.deleteUserById(+command.id)
    }    
}