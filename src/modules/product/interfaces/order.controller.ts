import { JwtAuthGuard } from "@common/guards/jwt-auth.guard";
import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetProductWithUserQuery } from "../application/queries";
import { ProductWithUserRequestDto } from "../application/dtos";

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @Post()
    async getOrderInfo(
        @Body() requestModel: ProductWithUserRequestDto
    ) {
        return this.queryBus.execute(
            new GetProductWithUserQuery(requestModel.name ?? '', requestModel.userId)
        )
    }
    
}