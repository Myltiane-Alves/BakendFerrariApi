import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService) {}

    @Post()
    async verifyEmail(@Body('email') email) {

        try {
            await this.userService.getByEmail(email);
            return { exists: true };
        } catch (e) {
            return { exists: false };
        }

    }

    @Post('register')
    async register(@Body() body) {
        
        return this.userService.create();
    }
}