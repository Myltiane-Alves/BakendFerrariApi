import { ContactController } from './contact.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        ContactController,],
    providers: [],
})
export class ContactModule { }
