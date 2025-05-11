import { ICommand } from '@nestjs/cqrs';

export class LoginCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
  ) {}
}
