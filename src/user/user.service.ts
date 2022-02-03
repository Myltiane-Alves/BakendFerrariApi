import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async get(id: number) {

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
                        phone,
                        //document,
                    },
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
        
        const userCreated = await this.prisma.user.create({
            data: {
                person: {
                    create: {
                        name,
                        birthAt,
                        phone,
                        //document,
                    },
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
}