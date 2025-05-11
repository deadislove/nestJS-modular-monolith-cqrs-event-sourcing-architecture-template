import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import UserTypeOrmEntity from "../typeorm/entities/user.orm-entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { plainToInstance } from "class-transformer";
import { User } from "@modules/user/domain/entities/user.entity";
import { IUserRepository } from "@modules/user/domain/interfaces/user.repository.interface";
import { UserId } from "@modules/user/domain/value-objects/user-id.vo";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserTypeOrmEntity)
        private readonly repo: Repository<UserTypeOrmEntity>
    ) { }

    async findOne(id: UserId): Promise<User | null> {
        const data: UserTypeOrmEntity | null = await this.repo.findOne({
            where: {
                id: id.value
            }
        })

        return plainToInstance(User, data)
    }

    async findAll(): Promise<User[]> {
        const data: UserTypeOrmEntity[] = await this.repo.find()

        return plainToInstance(User, data)
    }

    async create(entity: Partial<UserTypeOrmEntity>): Promise<Partial<User> & User> {
        const result: Partial<UserTypeOrmEntity> & UserTypeOrmEntity = await this.repo.save(entity)

        return plainToInstance(User, result)
    }

    async update(id: UserId, entity: Partial<UserTypeOrmEntity>): Promise<boolean> {
        
        const result: UpdateResult = await this.repo.update(id.value, entity)

        return result.affected !== 0
    }

    async delete(id: UserId): Promise<boolean> {
        const result: DeleteResult = await this.repo.delete(id.value)

        return result.affected !== 0
    }

    async findByUsername(username: string): Promise<User | null> {
        const data: UserTypeOrmEntity | null = await this.repo.findOne({
            where: {
                name: username
            }
        })

        return plainToInstance(User, data)
    }
}