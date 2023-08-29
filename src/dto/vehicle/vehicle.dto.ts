import { Vehicle } from "src/entitys/vehicle.entity";
import { PersonDto } from "../person/person.dto";
import { EntryVehicle } from "src/entitys/entry_vehicle.entity";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/swagger";
import { VehicleType } from "src/entitys/vehicle_type.entity";

export class VehicleDto {
    @IsNumber()
    id: number;

    @IsString()
    registration: string

    @IsDateString()
    dateOfEntry: Date;

    @IsDateString()
    dateOfOut: Date;

    @ValidateNested()
    @Type(()=>PersonDto)
    person: PersonDto;

    @ValidateNested()
    @Type(()=>VehicleType)
    vehicleType: VehicleType;

    @ValidateNested()
    @Type(()=>Array<EntryVehicle>)
    entryVehicle:EntryVehicle[];
}

export class CreateVehicleDto extends PartialType(VehicleDto){
    @IsNotEmpty()
    @IsString()
    registration: string

    @IsNotEmpty()
    @IsDateString()
    dateOfEntry: Date;

    @IsNotEmpty()
    @IsDateString()
    dateOfOut: Date;

    @IsNotEmpty()
    @ValidateNested()
    @Type(()=>VehicleType)
    vehicleType: VehicleType;
}

export class UpdateVehicleDto extends PartialType(VehicleDto){
    @IsNotEmpty()
    @IsNumber()
    id: number;
}