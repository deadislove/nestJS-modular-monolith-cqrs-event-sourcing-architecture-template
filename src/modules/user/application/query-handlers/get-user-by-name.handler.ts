import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByNameQuery } from "../queries/get-user-by-name.query";
import { UserService } from "../services/user.service";
import { User } from "@modules/user/domain/entities/user.entity";

@QueryHandler(GetUserByNameQuery)
export class GetUserByNameHandler implements IQueryHandler<GetUserByNameQuery> {
    constructor(private readonly userService: UserService) {}

    execute(query: GetUserByNameQuery): Promise<User | null> {
        return this.userService.findByUsername(query.name)
    }
}