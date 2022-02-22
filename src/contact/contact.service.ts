import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
    constructor(private db: PrismaService) { }

    async list() {

        return this.db.contact.findMany();
    }

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
            //verificando se a pessoa já existe no banco de dados

            const contact = await this.db.contact.findFirst({
                where:{
                    email,
                },
            });

            // se a pessoa existe
            if(contact) {
                personId = Number(contact.personId);
            } else {

                const newPerson = await this.db.person.create({
                    data: {
                        name,
                    }
                });
                personId = Number(newPerson.id);
            }

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
