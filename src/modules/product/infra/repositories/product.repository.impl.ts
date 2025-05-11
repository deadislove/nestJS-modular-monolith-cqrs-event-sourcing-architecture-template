import { IProductRepository } from "@modules/product/domain/interfaces/product.repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import ProductTypeOrmEntity from "../typeorm/entities/product.orm-entity";
import { Product } from "@modules/product/domain/entities/product.entity";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ProductRepository implements IProductRepository {
    constructor(
        @InjectRepository(ProductTypeOrmEntity)
        private readonly repo: Repository<ProductTypeOrmEntity>
    ){}

    async findOne(id: number): Promise<Product | null> {
        const data: ProductTypeOrmEntity | null = await this.repo.findOne({
            where: {
                id: id
            }
        })

        return plainToInstance(Product, data)
    }

    async findAll(): Promise<Product[]> {
        const data: ProductTypeOrmEntity[] = await this.repo.find()
        
        return plainToInstance(Product, data)
    }

    async create(entity: Partial<ProductTypeOrmEntity>): Promise<Partial<Product> & Product> {
        const result: Partial<ProductTypeOrmEntity> & ProductTypeOrmEntity = await this.repo.save(entity)

        return plainToInstance(Product, result)
    }

    async update(id: number, entity: Partial<ProductTypeOrmEntity>) : Promise<boolean> {
        const result: UpdateResult = await this.repo.update(id, entity)
        
        return result.affected !== 0
    }

    async delete(id: number): Promise<boolean> {
        const result: DeleteResult = await this.repo.delete(id)

        return result.affected !== 0
    }
}