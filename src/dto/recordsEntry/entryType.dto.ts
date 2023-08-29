import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Record_entry } from "src/entitys/record_entry.entity";

export class EntryTypeDto {
    @IsNumber()
    id: number;
    @IsString()
    type: string;
    @ValidateNested()
    @Type(() => Record_entry)
    recordEntry: Record_entry;
}

export class CreateEntryTypeDto extends PartialType(EntryTypeDto) {
    @IsNotEmpty()
    @IsString()
    type: string;
}

export class UpdateEntryTypeDto extends PartialType(EntryTypeDto) {
    @IsNotEmpty({
        always: true,
    })
    @IsNumber()
    id: number;
}