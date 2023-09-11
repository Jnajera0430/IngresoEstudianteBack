import { PartialType } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { PersonType } from "src/entitys/person_type.entity"

export class PersonTypeDto {
    id?: number
    name?: string
    state?: boolean
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

// export class CreatePersonTypeDto{
//     id?:number
//     name: string
//     state?:boolean
// }