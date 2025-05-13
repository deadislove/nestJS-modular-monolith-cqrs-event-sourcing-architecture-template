import { CreateUserHandler } from "./create-user.handler";
import { DeleteUserHandler } from "./delete-user.handler";
import { LoginHandler } from "./login.handler";
import { LogoutHandler } from "./logout.handler";
import { RegisterUserHandler } from "./register.handler";
import { UpdateUserHandler } from "./update-user.handler";

export const CommandHandler = [
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    LoginHandler,
    LogoutHandler,
    RegisterUserHandler,
]