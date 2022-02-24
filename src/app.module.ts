import { AddressService } from './address/address.service';
import { AddressModule } from './address/address.module';
import { AddressController } from './address/address.controller';
import { PaymentSituationsModule } from './payment/payment-situations.module';
import { PaymentSituationsService } from './payment/payment-situations.service';
import { PaymentSituationsController } from './payment/payment-situations.controller';
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
        AddressModule,
        PaymentSituationsModule,
        TimeOptionModule,
        ContactModule,
        MailModule,
        AuthModule,
        UserModule,
        PrismaModule,
        ServiceModule,
    ],
    controllers: [
        AddressController,
        PaymentSituationsController, AppController],
    providers: [
        AddressService,
        PaymentSituationsService,
        PasswordService,],
})
export class AppModule { }
