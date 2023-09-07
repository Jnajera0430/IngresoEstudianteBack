import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsBoolean, IsDateString, IsNotEmpty, ValidateNested } from "class-validator";
import { Career } from "src/entitys/career.entity";
import { CareerDto } from "../career/career.dto";

export class GroupDto {

    id?: number

    code: number

    dateStart: Date

    dateEnd: Date

    state?: boolean

    career: CareerDto
}


export class CreateGroup extends PartialType(GroupDto) {
    @IsNotEmpty()
    @IsNumber()
    code: number
    @IsNotEmpty()
    @IsDateString()
    dateStart: Date
    @IsNotEmpty()
    @IsDateString()
    dateEnd: Date
    @IsBoolean()
    state?: boolean
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Career)
    career: CareerDto
}

export class UpdateGroupDto extends PartialType(CreateGroup) {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

// export class UpdateGroupDto {
//     id: number
//     code?: number
//     dateStart?: Date
//     dateEnd?: Date
//     state?: boolean
//     career?: Career
// }