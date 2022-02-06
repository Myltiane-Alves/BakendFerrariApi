import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async () => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: '',
                        pass: '',
                    }
                },
            }),
        }),
    ],
    controllers: [],
    providers: [
        MailService,],
})
export class MailModule { }
