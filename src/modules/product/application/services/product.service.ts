import { DomainException } from "@core/exceptions/base-exception";
import { UUIDUtil } from "@core/utils/uuid.util";
import { IEventStore } from "@infra/event-store/event-store.interface";
import { Product } from "@modules/product/domain/entities/product.entity";
import { IProductRepository } from "@modules/product/domain/interfaces/product.repository.interface";
import ProductTypeOrmEntity from "@modules/product/infra/typeorm/entities/product.orm-entity";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ProductService {

    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        @Inject('IEventStore') private readonly eventStore: IEventStore
    ){}

    async createProduct(product: Product): Promise<Partial<Product> & Product> {
        try {
            const entity: ProductTypeOrmEntity = plainToInstance(ProductTypeOrmEntity, product)
            const result: Partial<Product> & Product = await this.productRepository.create(entity)
            await this.eventStore.appendEvent(UUIDUtil.generate(), {
                type: 'ProductCreated',
                payload: {
                    id: result.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                }
            })
            return result
        }
        catch(error){
            throw new DomainException('CREATE_PRODUCT_FAILED', error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async updateProduct(product: Product): Promise<boolean> {
        try {
            const entity: ProductTypeOrmEntity = plainToInstance(ProductTypeOrmEntity, product)
            return this.productRepository.update(entity.id, entity)
        }
        catch(error) {
            throw new DomainException('UPDATE_PRODUCT_FAILED', error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAll(): Promise<Product[]> {
        try {
            return this.productRepository.findAll()
        }
        catch(error) {
            throw new DomainException('GET_PRODUCT_LIST_FAILED', error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getProudctById(id:number): Promise<Product | null> {
        try {
            return this.productRepository.findOne(id)
        }
        catch(error) {
            throw new DomainException('GET_PRODUCT_BY_ID', error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteProductById(id:number): Promise<boolean> {
        try {
            return this.productRepository.delete(id)
        }
        catch(error) {
            throw new DomainException("DELETE_PRODUCT_FAILED", error.message, HttpStatus.BAD_REQUEST)
        }
    }
}