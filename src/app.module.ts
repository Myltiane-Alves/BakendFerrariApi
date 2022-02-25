import { ScheduleModule } from './schedule/schedule.module';
import { ScheduleController } from './schedule/schedule.controller';

import { AddressModule } from './address/address.module';
import { TimeOptionModule } from './timeOption/time-option.module';
import { ContactModule } from './contact/contact.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceModule } from './service/service.module';
import { PaymentSituationModule } from './payment-situation/payment-situation.module';

@Module({
    imports: [
        ScheduleModule,
        AddressModule,
        TimeOptionModule,
        ContactModule,
        MailModule,
        AuthModule,
        UserModule,
        PrismaModule,
        ServiceModule,
        PaymentSituationModule,

    ],
    controllers: [
        ScheduleController, AppController],
    providers: [],
})
export class AppModule { }