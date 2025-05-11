import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllProductsQuery } from "../queries";
import { ProductService } from "../services/product.service";
import { Product } from "@modules/product/domain/entities/product.entity";

@QueryHandler(GetAllProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetAllProductsQuery> {
    constructor(private readonly productService: ProductService) {}

    async execute(query: GetAllProductsQuery): Promise<Product[]> {
        return this.productService.getAll()
    }
}