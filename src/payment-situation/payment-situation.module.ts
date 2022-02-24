import { Module } from '@nestjs/common';
import { PaymentSituationService } from './payment-situation.service';
import { PaymentSituationController } from './payment-situation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentSituationController],
  providers: [PaymentSituationService]
})
export class PaymentSituationModule {}
