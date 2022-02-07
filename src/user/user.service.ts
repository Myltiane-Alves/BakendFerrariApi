import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { Prisma } from "@prisma/client";
import { MailService } from "src/mail/mail.service";
import { join } from "path";
import { existsSync, unlinkSync } from "fs";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private mailService: MailService,    
    ) {}

    async get(id: number, hash = false) {

        id = Number(id);

        if(isNaN(id)) {
            throw new BadRequestException('ID is required');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                person: true
            },
        });

        if(!hash) {

            delete user.password; 
        }

        if (!user) {
            throw new NotFoundException("User not found")
        }

        return user;
    }

    async getByEmail(email: string) {
        
        if(!email) {
            throw new BadRequestException('E-mail is required');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                person: true
            },
        });

        if (!user) {
            throw new NotFoundException("User not found")
        }

        delete user.password;

        return user;
    }

    async create({
        name,
        email,
        password,
        birthAt,
        phone,
        document
    }: {
        name: string;
        email: string;
        password: string;
        birthAt?: Date;
        phone?: string;
        document?: string;
    }) {

        if(!name) {
            throw new BadRequestException("Name is required");
        }
        
        if(!email) {
            throw new BadRequestException("E-mail is required");
        }

        if(!password) {
            throw new BadRequestException("Password is required");
        }

        if(birthAt && birthAt.toString().toLowerCase() === 'invaliddate'){
            throw new BadRequestException('Birth date is valid');
        }

        let user = null;

        try {
            user = await this.getByEmail(email);
        } catch (e) {

        }

        if (user) {
            throw new BadRequestException("Email already exists");
        }

        const userCreated = await this.prisma.user.create({
            data: {
                person: {
                    create: {
                        name,
                        birthAt,
                        document,
                        phone
                    }
                },
                email,
                password: bcrypt.hashSync(password, 10),
            },
            include: {
                person: true
            },
        });

        delete userCreated.password;

        return userCreated;
    }

    async update(id: number, {
        name,
        email,
        birthAt,
        phone,
        document,
        photo
    }: {
        name?: string;
        email?: string;
        birthAt?: Date;
        phone?: string;
        document?: string;
        photo?: string;
    }) {

        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException("ID is not a number");
        }

        const dataPerson = {} as Prisma.PersonUpdateInput;
        const dataUser = {} as Prisma.UserUpdateInput;

        if(name) {
            dataPerson.name = name;
        }

        if(birthAt) {
            dataPerson.birthAt = birthAt;
        }

        if(phone) {
            dataPerson.phone = phone;
        }

        if(document) {
            dataPerson.document = document;
        }
        if(email) {
            dataUser.email = email;
        }

        if (photo) {
            dataUser.photo = photo;
        }

        const user = await this.get(id);

        if (dataPerson) {
            await this.prisma.user.update({
                where: {
                    id: user.personId,
                },
                data: dataPerson
            });

        }

        if (dataUser) {
            await this.prisma.user.update({
                where: {
                    id,
                },
                data: dataUser,
            });
        }
     
        return this.get(id);
    }

    async checkPassword(id: number, password: string) {
        const user = await this.get(id, true);

        const checked = await bcrypt.compare(password, user.password);

        if(!checked) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        return true;
    }

    async updatePassword(id: number, password: string) {

        const user = await this.get(id);

        const userUpdated = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password: bcrypt.hashSync(password, 10),
            },
            include: {
                person: true,
            },
        });

        delete userUpdated.password;

        await this.mailService.send({
            to: userUpdated.email,
            subject: 'Senha alterada com sucesso!',
            template: 'reset-password-confirm',
            data: {

                name: userUpdated.person.name,
            },
            
        });

        return userUpdated;
    }

    async changePassword(id: number, currentPassword: string, newPassword: string) {

        if(!newPassword) {
            throw new BadRequestException("New password is required");
        }

        await this.checkPassword(id, currentPassword);

        return this.updatePassword(id, newPassword);
    }

    async removePhoto(userId: number) {

        const { photo } = await this.get(userId);

        if (photo) {
            const currentPhoto = join(__dirname, '../', '../', '../', 'storage', 'photos', photo);
            
            if (existsSync(currentPhoto)){
                unlinkSync(currentPhoto);
            }
        }
    }

    async setPhoto(id: number, file: Express.Multer.File) {

        if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
            throw new BadRequestException('Invalid file type')
        }

        // Remover a foto atuala se o usuário a possuir 
        await this.removePhoto(id);
        // Renomear arquivo temporário com a extensão correta

        // Atualizar o registro da foto no Banco de Dados
    }
}
