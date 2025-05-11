import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteProductCommand } from "../commands";
import { ProductService } from "../services/product.service";

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
    constructor(private readonly productService: ProductService) {}

    async execute(command: DeleteProductCommand): Promise<any> {
        return this.productService.deleteProductById(+command.id)
    }
}