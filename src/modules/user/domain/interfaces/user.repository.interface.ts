import UserTypeOrmEntity from "@modules/user/infra/typeorm/entities/user.orm-entity";
import { User } from "../entities/user.entity";
import { UserId } from "../value-objects/user-id.vo";

export interface IUserRepository {
    findOne(id: UserId): Promise<User | null>
    findAll(): Promise<User[]>
    create(entity: Partial<UserTypeOrmEntity>): Promise<Partial<User> & User>
    update(id: UserId, entity: Partial<UserTypeOrmEntity>): Promise<boolean>
    delete(id: UserId): Promise<boolean>
    findByUsername(username: string): Promise<User | null>
}