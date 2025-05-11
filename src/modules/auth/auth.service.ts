import { UserService } from "@modules/user/application/services/user.service"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.validateCredentials(username, password)
        if (!user) {
          throw new UnauthorizedException('Invalid credentials')
        }
        return user
      }
    
      async login(user: any): Promise<{ access_token: string }> {
        const payload = { sub: user.id, username: user.name }
        return {
          access_token: this.jwtService.sign(payload),
        }
      }
}