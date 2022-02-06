import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports: [
        PrismaModule,
        MailModule,
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
    ],
    exports: [
        UserService
    ]
})

export class UserModule {};