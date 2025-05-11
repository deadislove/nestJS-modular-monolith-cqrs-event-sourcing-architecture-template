import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserCommand, DeleteUserCommand, UpdateUserCommand } from "../application/commands";
import { GetAllUsersQuery, GetUserByIdQuery } from "../application/queries";
import { CreateUserDto, UpdateUserDto } from "../application/dtos";
import { JwtAuthGuard } from "@common/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ){}

    @Get()    
    async getUsers() {
        return this.queryBus.execute(
            new GetAllUsersQuery()
        )
    }

    @Get(':id')
    async getUserById(
        @Param('id', ParseIntPipe) id:number
    ){
        if( id === 0) {
            throw new HttpException('id can not equal to 0.', HttpStatus.BAD_REQUEST)
        }

        return this.queryBus.execute(
            new GetUserByIdQuery(id)
        )
    }

    @Post()
    async createUser(
        @Body() requestModel: CreateUserDto
    ) {
        return this.commandBus.execute(
            new CreateUserCommand(requestModel.name, requestModel.email)
        )
    }

    @Put(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() requestModel: UpdateUserDto
    ) {
        if(id !== requestModel.id || !requestModel) {
            throw new HttpException('Parameter ID must equal to request model info.', HttpStatus.BAD_REQUEST)
        }

        return this.commandBus.execute(
            new UpdateUserCommand(requestModel.id.toString(), requestModel.name, requestModel.email)
        )
    }

    @Delete(':id')
    async DeleteUser(
        @Param('id', ParseIntPipe) id: number
    ) {
        if(id === 0) {
            throw new HttpException('Parameter ID can\'t equal to 0', HttpStatus.BAD_REQUEST)
        }

        return this.commandBus.execute(
            new DeleteUserCommand(id.toString())
        )
    }
}