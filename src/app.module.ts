import { ContactModule } from './contact/contact.module';
import { PasswordService } from './user/password.service';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ContactModule,
        ContactModule,
        MailModule,
        AuthModule,
        UserModule,
        PrismaModule,
    ],
    controllers: [AppController],
    providers: [
        PasswordService,],
})
export class AppModule { }
