import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProductCommand } from "../commands";
import { ProductService } from "../services/product.service";
import { Product } from "@modules/product/domain/entities/product.entity";
import { plainToInstance } from "class-transformer";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(private readonly productService: ProductService) {}

    async execute(command: CreateProductCommand): Promise<Partial<Product> & Product> {
        const product:Product = plainToInstance(Product, command)
        return this.productService.createProduct(product)
    }
}