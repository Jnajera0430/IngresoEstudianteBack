import { IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/swagger";
import { VehicleType } from "src/entitys/vehicle_type.entity";
import { RecordVehicle } from "src/entitys/entry_vehicle.entity";

export class VehicleDto {
    @IsNumber()
    id: number;

    @IsString()
    badge: string

    @IsNumber()
    person: number;

    @ValidateNested()
    @Type(()=>VehicleType)
    vehicleType: VehicleType;

    @IsNumber()
    idRecord: number;
}

export class CreateVehicleDto extends PartialType(VehicleDto){
    @IsNotEmpty()
    @IsString()
    registration: string

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

export class CreateVehicleToEntryDto extends PartialType(VehicleDto){
    
    @IsNotEmpty()
    @IsNumber()
    idVehicleType: number;

    @IsNotEmpty()
    @IsString()
    badge: string;

    @IsNotEmpty()
    @IsNumber()
    idPerson: number;
}

export class FindVehicleToRecords {
    @IsNotEmpty()
    @IsNumber()
    idVehicle: number;

    @IsNotEmpty()
    @IsNumber()
    idPerson: number;

}