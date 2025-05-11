import { Injectable } from "@nestjs/common";
import { UserService } from "../services/user.service";

@Injectable()
export class UserFacade {
    constructor(
        private readonly userService: UserService
    ){}
}