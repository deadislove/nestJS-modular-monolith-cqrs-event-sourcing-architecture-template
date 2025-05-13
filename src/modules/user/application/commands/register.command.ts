import { ICommand } from "@nestjs/cqrs";

export class RegisterUserCommand implements ICommand {
    constructor(
        public readonly name: string,
        public readonly email: string,
    ) { }
}