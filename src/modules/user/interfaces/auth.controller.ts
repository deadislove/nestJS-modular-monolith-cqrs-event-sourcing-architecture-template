import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { LoginDto, RegisterDto } from "../application/dtos";
import { LoginCommand, LogoutCommand, RegisterUserCommand } from "../application/commands";
import { User } from "@common/decorators/user.decorator";
import { JwtAuthGuard } from "@common/guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}

    @Post('login')
    async Login(
        @Body() requestModel: LoginDto
    ) {
        return this.commandBus.execute(
            new LoginCommand(requestModel.name, requestModel.email)
        )
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async Logout(@User() user:any) {
        return this.commandBus.execute(
            new LogoutCommand(user.UserId)
        )
    }

    @Post('register')
    async Register(
        @Body() requestModel: RegisterDto
    ) {
        return this.commandBus.execute(
            new RegisterUserCommand(requestModel.name, requestModel.email)
        )
    }
}