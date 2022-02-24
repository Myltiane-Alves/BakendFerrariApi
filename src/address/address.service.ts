/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address'

@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService) {}

    dataIsValid(data: CreateAddressDto) {
       data.personId = Number(data.personId); 
       
       if(isNaN(data.personId)) {
            throw new BadRequestException('PersonId is invalid');
       }
       
       if(!data.street) {
            throw new BadRequestException('Street is invalid');
       }
       
       
       if(!data.district) {
            throw new BadRequestException('District is invalid');
       }
       
       
       if(!data.city) {
            throw new BadRequestException('City is invalid');
       }
       
       
       if(!data.state) {
            throw new BadRequestException('State is invalid');
       }

       if(!data.country) {
            throw new BadRequestException('Country is invalid');
       }

       if(!data.zipcode) {
            throw new BadRequestException('ZipCode is invalid');
       }
       
      return data as CreateAddressDto;
    }


    async create(data: CreateAddressDto) {
        return this.prisma.address.create({
            data: this.dataIsValid(data),
        })
    }
}
