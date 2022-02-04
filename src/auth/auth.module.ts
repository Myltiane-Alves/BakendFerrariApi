import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRE
                }
            })
        })
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
    ],
})

export class AuthModule {}
