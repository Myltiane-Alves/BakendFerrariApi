import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService { 

    constructor(private mailerService: MailerService) {}

    async send({
        to,
        subject,
        template,
        data
    }: {
        to: string;
        subject: string;
        template: string;
        data: any;
    }) {

        return this.mailerService.sendMail({
            to,
            subject,
            template,
            context: data
        });
    }
}
