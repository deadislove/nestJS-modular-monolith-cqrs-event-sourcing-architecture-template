import ProductTypeOrmEntity from "@modules/product/infra/typeorm/entities/product.orm-entity"
import { Product } from "../entities/product.entity"

export interface IProductRepository {
    findOne(id: number): Promise<Product | null>
    findAll(): Promise<Product[]>
    create(entity: Partial<ProductTypeOrmEntity>): Promise<Partial<Product> & Product>
    update(id: number, entity: Partial<ProductTypeOrmEntity>): Promise<boolean>
    delete(id: number): Promise<boolean>
}