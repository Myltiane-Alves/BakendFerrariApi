import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';

@Module({
    imports: [
        PrismaModule
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