import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentSituationService } from './payment-situation.service';
import { CreatePaymentSituationDto } from './dto/create-payment-situation.dto';
import { UpdatePaymentSituationDto } from './dto/update-payment-situation.dto';

@Controller('payment-situation')
export class PaymentSituationController {
  constructor(private readonly paymentSituationService: PaymentSituationService) {}

  @Post()
  create(@Body() createPaymentSituationDto: CreatePaymentSituationDto) {
    return this.paymentSituationService.create(createPaymentSituationDto);
  }

  @Get()
  findAll() {
    return this.paymentSituationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentSituationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentSituationDto: UpdatePaymentSituationDto) {
    return this.paymentSituationService.update(+id, updatePaymentSituationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentSituationService.remove(+id);
  }
}
