import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class ParameterDateDto {
    constructor(private readonly today = new Date()) { }

    @ApiProperty({
        minimum: 0,
        maximum: 22,
        default: 0
    })    
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(22)
    @IsOptional()
    readonly hourFrom: number = 0;
    @ApiProperty({
        minimum: 1,
        maximum: 23,
        default: 23
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(23)
    @IsOptional()
    readonly hourTo: number = 23;

    @ApiProperty({
        minimum: 1,
        maximum: new Date().getUTCFullYear(),
        default: new Date().getUTCFullYear()
    })
    @Type(() => Number)
    @IsInt()
    @Max(new Date().getUTCFullYear())
    @IsOptional()
    readonly fromYear: number = this.today.getUTCFullYear();

    @ApiProperty({
        minimum: 1,
        maximum: 12,
        default: new Date().getUTCMonth()
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(12)
    @IsOptional()
    readonly fromMonth: number = this.today.getUTCMonth();

    @ApiProperty({
        minimum: 1,
        maximum: 31,
        default: new Date().getUTCDate()
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(31)
    @IsOptional()
    readonly fromDay: number = this.today.getUTCDate();
}