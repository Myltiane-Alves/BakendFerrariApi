/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { userInfo } from 'os';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
export class ScheduleController {

    constructor(private scheduleService: ScheduleService){}

    @UseGuards(AuthGuard)
    @Get()
    async list() {
        return this.scheduleService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('my-schedules')
    async çistByPerson(@User() user) {
        return this.scheduleService.findByPerson(user.personId);
    }

    @UseGuards(AuthGuard)
    @Post()
    async createSchedule(
        @Body() data: CreateScheduleDto,
        @User() user,
    ) {
        return this.scheduleService.create(user.personId, data)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async removeShedule(
        @Param('id', ParseIntPipe) id: number,
        @User() user,
    ) {
        return this.scheduleService.remove(id, user.personId)
    }
}
