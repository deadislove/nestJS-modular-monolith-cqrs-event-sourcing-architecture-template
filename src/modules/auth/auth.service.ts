import { DomainException } from "@core/exceptions/base-exception"
import { UserService } from "@modules/user/application/services/user.service"
import { User } from "@modules/user/domain/entities/user.entity"
import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { plainToInstance } from "class-transformer"

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(username: string, email: string): Promise<User> {
    const user = await this.userService.validateCredentials(username, email)
    if (!user) {
      throw new DomainException('UNAUTHORIZED', 'Invalid credentials', HttpStatus.UNAUTHORIZED)
    }
    return user
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, username: user.name }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(username: string, email: string): Promise<{ access_token: string }> {

    const userEntity = plainToInstance(User, { name: username, email: email })
    const user = await this.userService.createUser(userEntity)
    const payload = { sub: user.id, username: user.name }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}