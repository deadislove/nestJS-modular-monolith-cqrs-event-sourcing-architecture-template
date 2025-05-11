import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByIdQuery } from "../queries/get-user-by-id.query";
import { UserService } from "../services/user.service";
import { User } from "@modules/user/domain/entities/user.entity";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
    constructor(private readonly userService: UserService){}

    execute(query: GetUserByIdQuery): Promise<User | null> {
        return this.userService.getUserById(query.id)
    }
}