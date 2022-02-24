import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidId } from 'utils/validation-id';
import { CreateAddressDto } from './dto/create-address';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {

    constructor(private database: PrismaService) {}

    async isValidPerson(id: number, personId: number) {

        personId = isValidId(personId)

        const address = await this.findOne(isValidId(id));

        if(address.personId !== personId) {
            throw new BadRequestException('Operation is invalid')
        }

    }

    async findAll(){
        return this.database.address.findMany()
    }

   
    async findOne(id: number) {

        return this.database.address.findUnique({
            where: {
                id: isValidId(id),
            }
        })
    }

    async findByPerson(personId: number) {

        return this.database.address.findMany({
            where: {
                personId: isValidId(personId),
            }
        })
    }


    async create(personId: number, data: CreateAddressDto) {

        personId = Number(personId);
        
        if (isNaN(personId)) {
            throw new NotFoundException("User not found.");
        }

        return this.database.address.create({
            data: {
                ...data,
                personId,
            },
        });

    }

    async update(id: number, personId: number, dataUpdate: UpdateAddressDto) {

      

        await this.isValidPerson(id, personId);

        return this.database.address.update({
            data: dataUpdate,
            where: {
                id: isValidId(id),
            }
        })
    }
    async delete(id: number, personId: number) {

        await this.isValidPerson(id, personId);

        return this.database.address.delete({
            where: {
                id: isValidId(id)
            },
        })
    }

}