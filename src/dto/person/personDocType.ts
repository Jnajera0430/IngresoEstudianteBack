import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePersonDocTypeDto {
    @IsNumber()
    id?: number;
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsBoolean()
    state?: boolean
}