/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentSituationsService {
    
    async create({
        cart,
        validation,
        cvv,
        name,
        bank,
        portion,
        cpf
    })
}
