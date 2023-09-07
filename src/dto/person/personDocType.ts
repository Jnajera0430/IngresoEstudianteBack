import { PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PersonDocumentTypeDto {
    id?: number;
    name: string;
    state?: boolean
}


export class CreatePersonDocTypeDto extends PartialType(PersonDocumentTypeDto) {
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class PersonTypeEnumDto {
    static TI = 'TI';
    static CC = 'CC';
}