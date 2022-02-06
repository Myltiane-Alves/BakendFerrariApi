import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { resolve } from 'path/posix';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async () => ({
                transport: {
                    host: process.env.MAIL_HOST,
                    port: Number(process.env.MAIL_PORT),
                    secure: false,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS,
                    },
                },
                defaults:{
                    from: `HCODE lab <${process.env.MAIL_FROM}>`
                },
                template: {
                    dir: resolve(__dirname, 'tempalte'),
                    adapter: new PugAdapter(),  
                    options: {
                        strict: true,
                    }
                }
            }),
        }),
    ],
    controllers: [],
    providers: [
        MailService,
    ],
    exports: [
        MailService
    ],
})
export class MailModule { }
