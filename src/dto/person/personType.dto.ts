import { PartialType } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"
// export class CreatePersonTypeDto{
//     id?:number
//     name: string
//     state?:boolean
// }

export class PersonTypeDto {
    @IsNumber()
    id: number
    @IsString()
    name: string
    @IsBoolean()
    state: boolean
}

export class CreatePersonTypeDto extends PartialType(PersonTypeDto) {
    @IsNotEmpty()
    @IsString()
    name: string
}

export class PersonTypeEnum {
    static APRENDIZ = 'Aprendiz';
    static DOCENTE = 'Docente';
    static SEGURIDAD = 'Seguridad';
    static ADMINISTRATIVO = 'Administrativo';
    static VISITANTE = 'Visitante';
}
