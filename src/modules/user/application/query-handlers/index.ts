import { GetUsersHandler } from "./get-all-users.handler";
import { GetUserByIdHandler } from "./get-user-by-id.handler";
import { GetUserByNameHandler } from "./get-user-by-name.handler";

export const QueryHandler = [
    GetUsersHandler,
    GetUserByIdHandler,
    GetUserByNameHandler,
]