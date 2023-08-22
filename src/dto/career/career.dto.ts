import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty, IsString, IsArray, Length, ValidateNested } from "class-validator";
import { Group } from "src/entitys/group.entity";
export class CareerDto{
    @IsNumber()
    id?:number;

    @IsString()
    name: string;
    @ValidateNested()
    @Type(()=>Array<Group>)
    group?: Group[];
}

export class CreateCareerDto extends PartialType(CareerDto){
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class UpdateOrFindCareer extends PartialType(CareerDto){
    @IsNotEmpty()
    @IsNumber()
    id:number;
}

export class FindCareerDto extends PartialType(CareerDto){
    @IsNotEmpty()
    @IsString()
    name: string;
}

// export class UpdateOrFindCareer{
//     id?:number;
//     name?: string;
//     group?: Group[];
// }
