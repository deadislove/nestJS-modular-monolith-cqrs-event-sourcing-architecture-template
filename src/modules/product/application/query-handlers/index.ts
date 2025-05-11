import { GetProductsHandler } from "./get-all-products.handler";
import { GetProductByIdHandler } from "./get-product-by-id.handler";
import { GetProductWithUserHandler } from "./get-product-with-user.handler";

export const QueryHandler = [
    GetProductsHandler,
    GetProductByIdHandler,
    GetProductWithUserHandler,
]