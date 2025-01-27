import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Record_entry } from "src/entitys/record_entry_and_out.entity";
import { RecordEntryDto } from "./recordEntry.dto";

export class EntryTypeDto {
    @IsNumber()
    id: number;
    @IsString()
    type: string;
    @ValidateNested()
    @Type(() => Array<RecordEntryDto>)
    recordEntry: RecordEntryDto[];
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