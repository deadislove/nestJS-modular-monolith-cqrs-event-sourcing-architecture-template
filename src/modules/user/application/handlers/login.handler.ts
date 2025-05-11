import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginCommand } from "../commands";
import { UserService } from "../services/user.service";
// import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import { AuthService } from "@modules/auth/auth.service";

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}

    async execute(command: LoginCommand): Promise<any> {
        const { name, email} = command

        const user = await this.userService.findByUsername(name)

        // optional
        // if(!user || !(await bcrypt.compare(email, user.email))) {
        //     throw new UnauthorizedException('Invalid credentials')
        // }

        if (!user || email !== user.email) {
            throw new UnauthorizedException('Invalid credentials');
        }
        // Create JWT token
        const token = this.authService.login(user)

        return token
    }
}