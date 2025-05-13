import { Expose } from "class-transformer"

export class RegisterDto {
    @Expose()
    public name: string
    @Expose()
    public email: string
}