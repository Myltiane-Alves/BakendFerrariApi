import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [
        PrismaModule
    ],
    controllers: [
        ContactController,],
    providers: [
        ContactService,],
})
export class ContactModule { }
