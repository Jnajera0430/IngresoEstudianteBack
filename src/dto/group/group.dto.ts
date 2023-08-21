import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsBoolean, IsDateString, IsNotEmpty, ValidateNested } from "class-validator";
import { Career } from "src/entitys/career.entity";

export class CreateGroup {
    @IsNumber()
    id?: number
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
    career: Career
}

export class UpdateGroupDto extends PartialType(CreateGroup){
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