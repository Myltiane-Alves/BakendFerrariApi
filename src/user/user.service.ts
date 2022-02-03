import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    get(id: number) {

        if(isNaN(Number(id))) {
            throw new BadRequestException('ID is required');
        }

        const user = this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                person: true
            },
        });
    }
}