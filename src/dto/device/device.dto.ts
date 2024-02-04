import { DeviceType } from './../../entitys/device_type.entity';
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { PersonDto } from "../person/person.dto";
import { Type } from "class-transformer";
import { DeviceTypeDto } from "./deviceType.dto";
import { PartialType } from "@nestjs/swagger";
import { Person } from "src/entitys/person.entity";

export class DeviceDto{
    id:number;

    dateOfEntry: Date;

    dateOfOut: Date;

    person: Person;

    deviceType: DeviceType
}

export class CreateDeviceDto extends PartialType(DeviceDto){
    @IsNotEmpty()
    @Type(()=>Person)
    person: Person;

    @IsNotEmpty()
    @Type(()=>DeviceType)
    deviceType: DeviceType;
}

export class UpdateDeviceDto extends PartialType(DeviceDto){
    @IsNotEmpty()
    @IsNumber()
    id:number;
}