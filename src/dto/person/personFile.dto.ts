import { IsNotEmpty, IsObject } from "class-validator";

export class PersonFile{
    typeDocument?: string;
    numDocument?: number;
    firstName?: string;
    lastName?: string;
    state?: string;
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