import { BadRequestException } from "@nestjs/common";

export const isValidId = (id: number) => {
    id = Number(id)

    if(isNaN(id)) {
        throw new BadRequestException('Id is invalid')
    }

    return id;
}
