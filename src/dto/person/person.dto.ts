import { IsNumber, IsString, IsNotEmpty, IsBooleanString, ValidateNested, IsArray, isNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { Device } from "src/entitys/device.entity";
import { DoctType } from "src/entitys/doctType.entity";
import { Group } from "src/entitys/group.entity";
import { PersonType } from "src/entitys/person_type.entity";
import { Record_entry } from "src/entitys/record_entry_and_out.entity";
import { Vehicle } from "src/entitys/vehicle.entity";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PersonDocumentTypeDto } from "./personDocType";
import { PersonTypeDto } from "./personType.dto";
import { Person } from "src/entitys/person.entity";

export class PersonDto {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    firtsName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    document: number;

    @ApiProperty()
    state: boolean;

    @ApiProperty()
    groups?: Group[];

    @ApiProperty()
    docType: PersonDocumentTypeDto;

    @ApiProperty()
    personTypes: PersonTypeDto;

    @ApiProperty()
    device?: Device[];

    @ApiProperty()
    vehicles?: Vehicle[];
    
    @ApiProperty()
    recordEntry?: Record_entry[];
}

export class CreatePerson extends PartialType(PersonDto) {
    @IsNotEmpty()
    @IsString()
    firtsName: string;
    @IsNotEmpty()
    @IsString()
    lastName: string;
    @IsNotEmpty()
    @IsString()
    document: number;
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PersonDocumentTypeDto)
    docType: PersonDocumentTypeDto;
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PersonTypeDto)
    personTypes: PersonTypeDto;
}

export class UpdatePerson extends PartialType(PersonDto){
    @IsNotEmpty()
    @IsNumber()
    id:number
}

export class FindPersonDto extends PartialType(PersonDto){
    @IsNotEmpty()
    @IsNumber()
    id:number
}

export class FindPersonDocumentDto extends PartialType(PersonDto){
    @IsNotEmpty()
    @IsNumber()
    document:number
}


// export class CreatePerson {
//     id?: number;
//     firtsName: string;
//     lastName: string;
//     document: string;
//     state?: boolean;
//     docType?: DoctType | null;
//     personTypes?: PersonType | null;
//     groups?: Group[] | null;
//     device?: Device[] | null;
//     vehicles?: Vehicle[] | null;
//     recordEntry?: Record_entry[] | null;
// }

// export class UpdatePerson {
//     id: number;
//     firtsName?: string;
//     lastName?: string;
//     document?: string;
//     state?: boolean;
//     docType?: DoctType | null;
//     personTypes?: PersonType | null;
//     groups?: Group[] | null;
//     device?: Device[] | null;
//     vehicles?: Vehicle[] | null;
//     recordEntry?: Record_entry[] | null;
// }

//export type CreatePersondtpPruba=Partial<PersonDto>
//export type UpdatePerson = Partial<PersonDto>