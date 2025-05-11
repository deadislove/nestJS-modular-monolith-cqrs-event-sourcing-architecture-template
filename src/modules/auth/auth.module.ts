import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "@modules/user/user.module";

@Module({
    imports: [
        forwardRef(() => UserModule),
        UserModule,
        PassportModule, 
        ConfigModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'your-secret-key',
            signOptions: { expiresIn: '1h' },
        })
    ],
    providers: [
        JwtStrategy,
        AuthService,
    ],
    exports: [
        AuthService,
        JwtModule,
    ]
})
export class AuthModule {}