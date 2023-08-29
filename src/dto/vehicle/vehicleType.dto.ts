import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import { VehicleDto } from "./vehicle.dto"
import { Type } from "class-transformer"
import { PartialType } from "@nestjs/swagger"

export class VehicleTypeDto{
    @IsNumber()
    id: number

    @IsString()
    vendor: string

    @ValidateNested()
    @Type(()=>VehicleDto)
    vehicle: VehicleDto
}

export class CreateVehicleTypeDto extends PartialType(VehicleTypeDto){
    @IsNotEmpty()
    @IsString()
    vendor: string
}

export class UpdateVehicleType extends PartialType(VehicleTypeDto){
    @IsNotEmpty()
    @IsNumber()
    id: number
}