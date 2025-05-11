import { Expose } from "class-transformer"

export class UpdateUserDto {
    @Expose()
    public id: number
    @Expose()
    public name: string
    @Expose()
    public email: string
}
