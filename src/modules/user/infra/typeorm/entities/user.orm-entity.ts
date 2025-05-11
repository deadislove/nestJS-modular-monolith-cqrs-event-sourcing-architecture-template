import { Type } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export default class UserTypeOrmEntity {
    @PrimaryGeneratedColumn()
    @Type(() => Number)
    id: number

    @Column()
    name:string

    @Column()
    email:string
}