import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { LoginDto } from "../application/dtos";
import { LoginCommand, LogoutCommand } from "../application/commands";
import { User } from "@common/decorators/user.decorator";

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

    @Post('logout')
    async Logout(@User() user:any) {
        return this.commandBus.execute(
            new LogoutCommand("1")
        )
    }
}