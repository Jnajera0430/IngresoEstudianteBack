import { EntryVehicle } from "src/entitys/entry_vehicle.entity";
import { PersonDto } from "../person/person.dto";
import { EntryDevice } from "src/entitys/entry_device.entity";
import { EntryTypeDto } from "./entryType.dto";
import { IsDate, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/swagger";

export class RecordEntryDto {
    @IsNumber()
    id: number;

    @IsDate()
    checkIn: Date;

    @IsDate()
    checkOut: Date;

    @ValidateNested()
    @Type(() => PersonDto)
    person: PersonDto;

    @ValidateNested()
    @Type(() => EntryVehicle)
    vehicleEntry: EntryVehicle;

    @ValidateNested()
    @Type(() => EntryDevice)
    deviceEntry: EntryDevice;

    @ValidateNested()
    @Type(() => EntryTypeDto)
    entryType: EntryTypeDto;
}

export class RecordsEntryOfPersonDto extends PartialType(RecordEntryDto) {
    @IsNotEmpty()
    @IsDate()
    checkIn: Date;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PersonDto)
    person: PersonDto;
}

export class FindRecordEntryOfPersonDto extends PartialType(RecordEntryDto){
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PersonDto)
    person: PersonDto;
}