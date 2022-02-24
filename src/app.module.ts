import { PaymentSituationModule } from './payment-situation/payment-situation.module';
import { PaymentSituationService } from './payment-situation/payment-situation.service';
import { PaymentSituationController } from './payment-situation/payment-situation.controller';
import { AddressService } from './address/address.service';
import { AddressModule } from './address/address.module';
import { AddressController } from './address/address.controller';

import { TimeOptionModule } from './timeOption/time-option.module';
import { ContactModule } from './contact/contact.module';
import { PasswordService } from './user/password.service';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceModule } from './service/service.module';

@Module({
    imports: [
        PaymentSituationModule,
        AddressModule,
        TimeOptionModule,
        ContactModule,
        MailModule,
        AuthModule,
        UserModule,
        PrismaModule,
        ServiceModule,
    ],
    controllers: [
        PaymentSituationController,
        AddressController,
        AppController],
    providers: [
        PaymentSituationService,
        AddressService,

        PasswordService,],
})
export class AppModule { }
