import { IsNumber, IsNotEmpty, IsString, IsArray, Length } from "class-validator";
import { Group } from "src/entitys/group.entity";

export class CreateCareerDto{
    @IsNumber()
    id?:number;
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsArray()
    group?: Group[];
}

export class UpdateOrFindCareer{
    @IsNumber()
    id?:number;
    @IsString()
    name?: string;
    @IsArray()
    group?: Group[];
}
