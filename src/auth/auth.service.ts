import { Injectable, UnauthorizedException,  BadRequestException  } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
//import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private prisma: PrismaService,
        private mailService: MailService
        ) {}

    async getToken(userId: number)   {

        const { email, photo, id, person } = await this.userService.get(userId);
        const { name } = person;

        return this.jwtService.sign({name, email, photo, id });
    }

    async login({email, password}: {email: string; password: string}){

        const user = await this.userService.getByEmail(email);

        await this.userService.checkPassword(user.id, password);

        const token = await this.getToken(user.id);

        return {
            token
        };
        
    }

    async decodeToken(token: string) {
        try {
            await this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Access Denied!', error.message);
        }

        return this.jwtService.decode(token);
    }

    async recovery(email: string) {
        
        const { id, } = await this.userService.getByEmail(email);

        const token = await this.jwtService.sign({
           
        
            expiresIn: 30 * 60
        }
        );

        await this.prisma.passwordRecovery.create({
            data: {
                userId: id,
                token: token
            }
        });

        
        return { success: true}

    }

   
    
}