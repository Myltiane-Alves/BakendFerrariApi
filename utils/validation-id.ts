import { BadRequestException } from "@nestjs/common";

export const isValidNumber = (id: number) => {
        
    id = Number(id);

    if (isNaN(id)) {
        throw new BadRequestException("ID is invalid.");
    }

    return id;

}