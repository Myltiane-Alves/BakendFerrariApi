/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {

    constructor(private db: PrismaService) { }

    async create({
        name,
        email,
        message 
    }:{
        name: string;
        email: string;
        message: string;
    }) {

       
        if (!name) {
            throw new BadRequestException('O nome é o brigatório')
        }
        if (!email) {
            throw new BadRequestException('a email é o brigatório')
        }
        if (!message) {
            throw new BadRequestException('a mensagem é o brigatório')
        }


        /*
            a pessoa que esta enviando o email já existe?
            sim relacionar o id dela á tabela de contatos
        */

        let personId;

        const user = await this.db.user.findUnique({
            where: {
                email,
            },
            select: {
                personId: true,
            },
        });

        if(user) {
            personId = Number(user.personId);
        } else {

           const person = await this.db.person.create({
                data: {
                    name,
                }
            });

            personId = Number(person.id);
        }
        // não crio o registro da pessoa depois relaciono

        return this.db.contact.create({
            data: {
                personId,
                email,
                message
            }
        })
    }
}
