import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RegisterUserCommand } from "../commands";
import { AuthService } from "@modules/auth/auth.service";

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
    constructor(private readonly authService: AuthService) {}

    async execute(command: RegisterUserCommand): Promise<any> {
        return this.authService.register(command.name, command.email)
    }
}