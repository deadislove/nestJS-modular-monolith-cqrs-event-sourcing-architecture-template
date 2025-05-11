import { Expose } from "class-transformer"

export class User {
    @Expose()
    public id: string
    @Expose()
    public name: string
    @Expose()
    public email: string

    constructor(name: string, email: string, id: string = '') {
        this.id = id
        this.name = name
        this.email = email
    }
}