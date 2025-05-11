import { UserService } from "@modules/user/application/services/user.service";
import { HttpStatus, Injectable } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { User } from "@modules/user/domain/entities/user.entity";
import { Product } from "@modules/product/domain/entities/product.entity";
import { ProductWithUserDto } from "../dtos";
import { DomainException } from "@core/exceptions/base-exception";
import { LoggerService } from "@infra/logger/logger.service";

@Injectable()
export class ProductFacade {
    constructor(
        private readonly userService: UserService,
        private readonly productService: ProductService,
        private readonly logger: LoggerService
    ) { }

    async GetProductWithUserById(name: string, userId: number = 0) {
        try {            
            let userInfo: User | null = null
            if (userId !== 0) {
                userInfo = await this.userService.getUserById(userId)
            }

            if (name) {
                userInfo = await this.userService.findByUsername(name)
            }

            let products: Product[] = await this.productService.getAll()

            this.logger.log(`userInfo: ${JSON.stringify(userInfo)}; productInfo: ${JSON.stringify(products)}`)

            return new ProductWithUserDto(userInfo, products)
        } catch (error) {
            this.logger.error(`OPERATION_FAILED; (${HttpStatus.BAD_REQUEST})Error message: ${error.message} `, '')
            throw new DomainException('OPEARTION_FAILED', error.message, HttpStatus.BAD_REQUEST)
        }
    }
}