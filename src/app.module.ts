import { PaymentSituationService } from './payment-situation/payment-situation.service';
import { PaymentSituattionController } from './payment-situation/payment-situattion.controller';
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
import { PaymentSituationModule } from './payment-situation/payment-situation.module';

@Module({
    imports: [
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
        PaymentSituattionController,
        AddressController,
        AppController],
    providers: [
        PaymentSituationService,
        AddressService,

        PasswordService,],
})
export class AppModule { }
