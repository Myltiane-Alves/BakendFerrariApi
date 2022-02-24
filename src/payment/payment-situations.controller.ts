/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { create } from 'domain';
import { PaymentSituationsService } from './payment-situations.service';

@Controller('payment')
export class PaymentSituationsController {
    constructor(private paymentSituationsService: PaymentSituationsService) { }

    @Post()
    async create(
        @Body('cart') cart,
        @Body('validation') validation,
        @Body('cvv') cvv,
        @Body('name') name,
        @Body('bank') bank,
        @Body('portion') portion,
        @Body('cpf') cpf,
    ) {

        return this.paymentSituationsService.create({
            cart,
            validation,
            cvv,
            name,
            bank,
            portion,
            cpf
        })
    }

}
