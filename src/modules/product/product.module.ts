import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ProductTypeOrmEntity from "./infra/typeorm/entities/product.orm-entity";
import { CqrsModule } from "@nestjs/cqrs";
import { ProductService } from "./application/services/product.service";
import { ProductRepository } from "./infra/repositories/product.repository.impl";
import { ProductController } from "./interfaces/product.controller";
import { CommandHandler } from "./application/handlers";
import { QueryHandler } from "./application/query-handlers";
import { ProductFacade } from "./application/facades/product.facades.service";
import { UserModule } from "@modules/user/user.module";
import { OrderController } from "./interfaces/order.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductTypeOrmEntity,
        ]),
        CqrsModule,
        UserModule,
    ],
    controllers: [
        ProductController,
        OrderController,
    ],
    providers: [
        ProductService,
        {
            provide: 'IProductRepository',
            useClass: ProductRepository
        },
        ...CommandHandler,
        ...QueryHandler,
        ProductFacade,
    ],
    exports: [
        ProductService,
        ProductFacade,
    ]
})
export class ProductModule {}