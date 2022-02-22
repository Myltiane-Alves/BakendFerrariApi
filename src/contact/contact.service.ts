/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {

    constructor(private db: PrismaService) {}
    
    async create(
        {name, email, message}: 
        {name: string; email:string; message: string;}
    ) {

        
    }
 }
