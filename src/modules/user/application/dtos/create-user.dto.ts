import { Expose } from "class-transformer"

export class CreateUserDto {
    @Expose()
    public name: string
    @Expose()
    public email: string
}
