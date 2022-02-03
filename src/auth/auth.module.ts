import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        UserModule,
        JwtModule
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
    ],
})

export class AuthModule {}
