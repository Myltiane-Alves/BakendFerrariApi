/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TimeOptionService {

    constructor(private prisma: PrismaService) {}

    async listTimeOptions() {

        return this.prisma.timeOption.findMany();
    }

    async createTimeOptions({day, time}: {day: number; time: Date}) {

        if(!day) {
            throw new BadRequestException('Day is required')
        }

        if(!time) {
            throw new BadRequestException('Day is required')
        }

        await this.prisma.timeOption.create({
            data: {
                day,
                time
            },
        });
    }

}
