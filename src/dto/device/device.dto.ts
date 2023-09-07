import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { PersonDto } from "../person/person.dto";
import { Type } from "class-transformer";
import { DeviceTypeDto } from "./deviceType.dto";
import { PartialType } from "@nestjs/swagger";

export class DeviceDto{   
    id:number;
    
    dateOfEntry: Date;
    
    dateOfOut: Date;
    
    person: PersonDto;

    deviceType: DeviceTypeDto
}

export class CreateDeviceDto extends PartialType(DeviceDto){
    @IsNotEmpty()
    @Type(()=>PersonDto)
    person: PersonDto;

    @IsNotEmpty()
    @Type(()=>DeviceTypeDto)
    deviceType: DeviceTypeDto;
}

export class UpdateDeviceDto extends PartialType(DeviceDto){
    @IsNotEmpty()
    @IsNumber()
    id:number;
}