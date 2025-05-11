import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllProductsQuery, GetProductByIdQuery } from "../application/queries";
import { CreateProductDto, UpdateProductDto } from "../application/dtos";
import { CreateProductCommand, DeleteProductCommand, UpdateProductCommand } from "../application/commands";
import { JwtAuthGuard } from "@common/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Get()
    async getProducts() {
        return this.queryBus.execute(
            new GetAllProductsQuery()
        )
    }

    @Get(':id')
    async getProductById(
        @Param('id', ParseIntPipe) id: number
    ) {
        if (id === 0) {
            throw new HttpException('id can not equal to 0.', HttpStatus.BAD_REQUEST)
        }

        return this.queryBus.execute(
            new GetProductByIdQuery(id)
        )
    }

    @Post()
    async createProduct(
        @Body() requestModel: CreateProductDto
    ) {
        return this.commandBus.execute(
            new CreateProductCommand(
                requestModel.name,
                requestModel.description,
                requestModel.price,
                requestModel.stock,
                requestModel.category,
                requestModel.isActive,
                requestModel.createdAt ?? new Date(),
                requestModel.updatedAt ?? new Date()
            )
        )
    }

    @Put(':id')
    async updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() requestModel: UpdateProductDto
    ) {
        if(id !== requestModel.id || !requestModel) {
            throw new HttpException('Parameter ID must equal to request model info.', HttpStatus.BAD_REQUEST)
        }

        if(requestModel.updatedAt) {
            requestModel = requestModel.withDefaults()
        }

        return this.commandBus.execute(
            new UpdateProductCommand(
                requestModel.id.toString(),
                requestModel.name,
                requestModel.description,
                requestModel.price,
                requestModel.stock,
                requestModel.category,
                requestModel.isActive,
                undefined,
                requestModel.updatedAt
            )
        )
    }

    @Delete(':id')
    async DeleteProduct(
        @Param('id', ParseIntPipe) id: number
    ) {
        if(id === 0) {
            throw new HttpException('Parameter ID can\'t equal to 0', HttpStatus.BAD_REQUEST)
        }

        return this.commandBus.execute(
            new DeleteProductCommand(id.toString())
        )
    }
}