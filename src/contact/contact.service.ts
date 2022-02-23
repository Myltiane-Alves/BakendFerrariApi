import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
    constructor(private db: PrismaService) { }

    async get(id: number) {
        
        id = Number(id);

        if(isNaN(id)) {
            throw new BadRequestException('ID is not a number');
        }

        return this.db.contact.findUnique({
            where: {
                id,
            }
        });

    }

    async list() {

        return this.db.contact.findMany();
    }

    async create({
        name,
        email,
        message
    }: {
        name: string;
        email: string;
        message: string;
    }) {

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

        let personId: number;

        const user = await this.db.user.findUnique({
            where: {
                email,
            },
            select: {
                personId: true,
            },
        });

        if (user) {
            personId = Number(user.personId);
        } else {
            //verificando se a pessoa já existe no banco de dados
            const contact = await this.db.contact.findFirst({
                where: {
                    email,
                },
            });
            // se a pessoa existe
            if (contact) {
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

    async delete(id: number) {

        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('Id is invalid')
        }

        if(!await this.get(id)) {
            throw new NotFoundException('ID not exists')
        }

        return this.db.contact.delete({
            where: {
                id,
            }
        })

    }
}
