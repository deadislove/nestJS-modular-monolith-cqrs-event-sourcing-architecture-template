import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // optional: allow expired token for refresh
            secretOrKey: configService.get<string>('JWT_SECRET') ?? 'default_secret',
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username }
    }
}