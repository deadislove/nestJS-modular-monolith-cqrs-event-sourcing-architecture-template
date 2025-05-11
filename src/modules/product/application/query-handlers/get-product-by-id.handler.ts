import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductByIdQuery } from "../queries";
import { ProductService } from "../services/product.service";
import { Product } from "@modules/product/domain/entities/product.entity";

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler implements IQueryHandler<GetProductByIdQuery> {
    constructor(private readonly productService: ProductService) {}

    async execute(query: GetProductByIdQuery): Promise<Product | null> {
        return this.productService.getProudctById(query.id)
    }
}