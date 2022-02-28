import { Injectable, BadRequestException,  NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'utils/validation-id';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {

    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.schedule.findMany();
    }
    async findByPerson(id: number) {
        
        return this.prisma.schedule.findMany({
            where: {
                personId: isValidNumber(id),
            },
        });
    }

    async findOne(id: number) {

        return this.prisma.schedule.findUnique({
            where: {
                id: isValidNumber(id)
            }
        })
    }

    async create(personId: number, {
        timeOptionId,
        billingAddressId,
        paymentSituationId,
        scheduleAt,
        total,
        installments,
        services,
    }: CreateScheduleDto) {

        scheduleAt = new Date(scheduleAt);
        timeOptionId = isValidNumber(timeOptionId);
        billingAddressId = isValidNumber(billingAddressId);

        const timeOpotion = await this.prisma.timeOption.findUnique({
            where: {
                id: isValidNumber(timeOptionId),
            },
        });
        
        if(!timeOpotion) {
            throw new BadRequestException('Time option not found.')
        };
        
        const address = await this.prisma.address.findUnique({
            where: {
                id: billingAddressId,
            },
        });
        
        if(!address) {
            throw new NotFoundException('Adress not found.')
        };
        
        const currentScheduleAt = await this.prisma.schedule.findFirst({
            where: {
                scheduleAt,
            },
        });
        
        if(currentScheduleAt) {
            throw new BadRequestException('Schedule already choosen.')
        };
        
        
        
        const schedule = await this.prisma.schedule.create({
            data: {
                timeOptionId,
                billingAddressId,
                paymentSituationId: isValidNumber(paymentSituationId),
                scheduleAt,
                total: isValidNumber(total),
                installments: isValidNumber(installments),
                personId: isValidNumber(personId),
            }
        });

        if (schedule) {

            services.split(',').forEach(async (item) => {
                await this.prisma.scheduleService.create({
                    data: {
                        scheduleId: schedule.id,
                        serviceId: +item,
                    }
                })
            })
        }

        return schedule;
    }

    async remove(id: number, personId: number) {

        await this.isValidPerson(id, personId);

        return this.prisma.schedule.delete({
            where: {
                id: isValidNumber(id),
            },
        });

    }
}
