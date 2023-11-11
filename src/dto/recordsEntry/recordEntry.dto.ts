import { EntryVehicle } from "src/entitys/entry_vehicle.entity";
import { FindPersonDocumentDto, PersonDto } from "../person/person.dto";
import { EntryDevice } from "src/entitys/entry_device.entity";
import { EntryTypeDto } from "./entryType.dto";
import { IsDate, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/swagger";
import { EntryPerson } from "src/entitys/entry_person.entity";
import { Vehicle } from "src/entitys/vehicle.entity";
import { Device } from "src/entitys/device.entity";
import { Record_entry } from "src/entitys/record_entry_and_out.entity";

export class RecordEntryDto {
    id?: number;

    checkIn?: Date;

    checkOut?: Date;

    person: FindPersonDocumentDto;

    vehicleEntry?: Vehicle;

    deviceEntry?: Device;

    entryType: EntryTypeDto;
    personEntry: EntryPerson[];
    constructor(person: FindPersonDocumentDto) {
        this.person = person;
    }
}

export class RecordsEntryOfPersonDto extends PartialType(RecordEntryDto) {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => FindPersonDocumentDto)
    person: FindPersonDocumentDto;
}

export class FindRecordEntryOfPersonDto extends PartialType(RecordEntryDto) {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => FindPersonDocumentDto)
    person: FindPersonDocumentDto;
    constructor(person: Record_entry) {
        super(person);
    }
}