import { CreateAddressDto } from './create-address';
import { PartialType } from '@nestjs'
export class UpdateAddressDto extends PartialType(CreateAddressDto) {

}