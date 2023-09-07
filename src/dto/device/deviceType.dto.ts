import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Device } from "src/entitys/device.entity";

export class DeviceTypeDto {
    id: number;
    brand: string;
    device: Device;
}

export class CreateDeviceTypeDto extends PartialType(DeviceTypeDto){
    @IsNotEmpty()
    @IsString()
    brand: string;
}

export class UpdateDeviceTypeDto extends PartialType(DeviceTypeDto){
    @IsNotEmpty()
    @IsNumber()
    id: number;
}