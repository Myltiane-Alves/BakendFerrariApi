import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

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

        return user;
    }

    async create({
        name,
        email,
        password,
        birthAt,
        phone,
        document,
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
    }
}