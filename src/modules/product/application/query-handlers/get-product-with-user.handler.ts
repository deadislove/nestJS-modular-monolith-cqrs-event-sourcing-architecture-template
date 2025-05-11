import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductWithUserQuery } from "../queries";
import { ProductFacade } from "../facades/product.facades.service";
import { ProductWithUserDto } from "../dtos";

@QueryHandler(GetProductWithUserQuery)
export class GetProductWithUserHandler implements IQueryHandler<GetProductWithUserQuery> {
    constructor(private readonly productFacdes: ProductFacade) {}

    async execute(query: GetProductWithUserQuery): Promise<ProductWithUserDto> {
        return this.productFacdes.GetProductWithUserById(query.name, query.userId)
    }
}