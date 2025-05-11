import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LogoutCommand } from "../commands";

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
    async execute(command: LogoutCommand): Promise<any> {
        return { messages: 'Logged out successfully' }
    }    
}