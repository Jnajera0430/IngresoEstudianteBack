import { IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/swagger";
import { VehicleType } from "src/entitys/vehicle_type.entity";
import { Person } from "src/entitys/person.entity";
import { RecordVehicle } from "src/entitys/entry_vehicle.entity";

export class VehicleDto {
    @IsNumber()
    id: number;

    @IsString()
    badge: string

    @IsDateString()
    dateOfEntry: Date;

    @IsDateString()
    dateOfOut: Date;

    @ValidateNested()
    person: number;

    @ValidateNested()
    @Type(()=>VehicleType)
    vehicleType: VehicleType;

    @ValidateNested()
    @Type(()=>Array<RecordVehicle>)
    recordEntry: RecordVehicle[]
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

export class CreateVehicleToEntry extends PartialType(VehicleDto){
    @IsNotEmpty()
    @IsNumber()
    person: number;
    @IsNotEmpty()
    @IsNumber()
    idVehicleType: number;
    @IsNotEmpty()
    @IsString()
    registration: string;
}