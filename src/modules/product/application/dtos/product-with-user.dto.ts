import { Product } from "@modules/product/domain/entities/product.entity";
import { User } from "@modules/user/domain/entities/user.entity";

export class ProductWithUserDto {
    public userInfo:  User | null
    public productInfo: Product[]

    constructor(user: User| null, products: Product[]) {
        this.userInfo = user
        this.productInfo = products
    }
}

export class ProductWithUserRequestDto {
    public name: string | null
    public userId: number
}