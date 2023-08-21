import { IsNumber, IsString, IsNotEmpty, IsBooleanString, ValidateNested, IsArray, isNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { Device } from "src/entitys/device.entity";
import { DoctType } from "src/entitys/doctType.entity";
import { Group } from "src/entitys/group.entity";
import { PersonType } from "src/entitys/person_type.entity";
import { Record_entry } from "src/entitys/record_entry.entity";
import { Vehicle } from "src/entitys/vehicle.entity";
import { PartialType } from "@nestjs/swagger";

export class PersonDto {
    @IsNumber()
    id?: number;
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
    @IsBooleanString()
    state: boolean;
    @ValidateNested()
    @IsArray()
    @Type(() => Array<Group>)
    groups?: Group[];
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => DoctType)
    docType: DoctType;
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PersonType)
    personTypes: PersonType;
    @ValidateNested()
    @IsArray()
    @Type(() => Array<Device>)
    device?: Device[];
    @ValidateNested()
    @IsArray()
    @Type(() => Array<Vehicle>)
    vehicles?: Vehicle[];
    @ValidateNested()
    @IsArray()
    @Type(() => Array<Record_entry>)
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
    @Type(() => DoctType)
    docType: DoctType;
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PersonType)
    personTypes: PersonType;
}

export class UpdatePerson extends PartialType(CreatePerson){
    @IsNotEmpty()
    @IsNumber()
    id:number
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