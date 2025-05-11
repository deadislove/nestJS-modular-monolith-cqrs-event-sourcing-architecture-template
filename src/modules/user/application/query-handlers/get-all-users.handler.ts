import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllUsersQuery } from "../queries/get-all-users.query";
import { UserService } from "../services/user.service";
import { User } from "@modules/user/domain/entities/user.entity";

@QueryHandler(GetAllUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetAllUsersQuery> {
    constructor(private readonly userService: UserService) {}

    execute(query: GetAllUsersQuery): Promise<User[]> {
        return this.userService.getAll()
    }
}