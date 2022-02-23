/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { TimeOptionService } from './time-option.service';

@Controller('time-options')
export class TimeOptionController {

    constructor(private timeOptionService: TimeOptionService) {}

    @Get()
    async getTimeOptions() {
        
        return this.timeOptionService.listTimeOptions();

    }
}
