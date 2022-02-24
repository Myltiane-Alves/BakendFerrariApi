/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
    constructor(private addressService: AddressService) {}
    
    @Post()
    async create(
        @Body('street') street,
        @Body('number') number,
        @Body('complement') complement,
        @Body('district') district,
        @Body('city') city,
        @Body('state') state,
        @Body('country') country,
        @Body('zipcode') zipcode,
        @Body('personId') personId,
    ) {
        
    }
}
