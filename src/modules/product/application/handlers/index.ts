import { CreateProductHandler } from "./create-product.handler"
import { DeleteProductHandler } from "./delete-product.handler"
import { UpdateProductHandler } from "./update-product.handler"

export {
    CreateProductHandler,
    DeleteProductHandler,
    UpdateProductHandler,
}

export default {
    CreateProductHandler,
    DeleteProductHandler,
    UpdateProductHandler,
}

export const CommandHandler = [
    CreateProductHandler,
    DeleteProductHandler,
    UpdateProductHandler,
]