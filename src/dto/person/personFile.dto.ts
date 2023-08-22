import { IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { PersonDto } from "./person.dto";
import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { PersonDocumentTypeDto } from "./personDocType";
import { PersonTypeDto } from "./personType.dto";
import { CreateCareerDto } from "../career/career.dto";

export class PersonFile extends PartialType(PersonDto){
    @IsNotEmpty()
    @IsString()
    firtsName: string;
    @IsNotEmpty()
    @IsString()
    lastName: string;
    @IsNotEmpty()
    @IsString()
    document: number;
    @IsNotEmpty()
    @Type(() => PersonDocumentTypeDto)
    docType: PersonDocumentTypeDto;
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PersonTypeDto)
    personTypes: PersonTypeDto;
    // typeDocument?: string;
    // numDocument?: number;
    // firstName?: string;
    // lastName?: string;
    // state?: string;
}

export class GetInfoFile {
    @IsNotEmpty()
    @IsObject()
    file: Express.Multer.File
}

export class CellObject {
    1: "A";
    2: "B";
    3: "C";
    4: "D";
    5: "E";
}

export interface InfoOfProgram  {
    fechaDelReporte: string,
    fichaDeCaracterización: string,
    career: CreateCareerDto,
    codigo: number,
    fechaInicio: string,
    fechaFin: string,
}

export interface DataOfFileExcel{
    infoOfProgram:InfoOfProgram,
    listPeopleFile:PersonFile[]
}