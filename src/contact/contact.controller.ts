/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';

@Controller('contacts')
export class ContactController {

    constructor(private contactService: ContactService) { }

    @Post()
    async create(
        @Body('name') name,
        @Body('email') email,
        @Body('message') message
    ) {

        return this.contactService.create({
            name,
            email,
            message
        });
    }
}
