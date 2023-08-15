import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty, IsString, IsArray, Length, ValidateNested } from "class-validator";
import { Group } from "src/entitys/group.entity";

export class CreateCareerDto{
    @IsNumber()
    id?:number;
    @IsNotEmpty()
    @IsString()
    name: string;
    @ValidateNested()
    @IsArray()
    @Type(()=>Array<Group>)
    group?: Group[];
}

export class UpdateOrFindCareer extends PartialType(CreateCareerDto){
    @IsNotEmpty()
    @IsNumber()
    id:number;
}

// export class UpdateOrFindCareer{
//     @IsNumber()
//     id?:number;
//     @IsString()
//     name?: string;
//     @IsArray()
//     group?: Group[];
// }
