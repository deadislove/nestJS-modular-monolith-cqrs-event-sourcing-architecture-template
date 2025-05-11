import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateProductCommand } from "../commands";
import { ProductService } from "../services/product.service";
import { Product } from "@modules/product/domain/entities/product.entity";
import { plainToInstance } from "class-transformer";

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
    constructor(private readonly productService: ProductService) {}

    async execute(command: UpdateProductCommand): Promise<any> {
        const product: Product = plainToInstance(Product, command)
        return this.productService.updateProduct(product)
    }
}