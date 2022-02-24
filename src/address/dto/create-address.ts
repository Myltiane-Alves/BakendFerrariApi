export class CreateAddressDto {
    street: string;
    number?: string;
    complement: string;
    district: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    personId: number;
}