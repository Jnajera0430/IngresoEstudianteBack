import { PartialType } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"
// export class CreatePersonTypeDto{
//     id?:number
//     name: string
//     state?:boolean
// }

export class PersonTypeDto{
    @IsNotEmpty()
    @IsNumber()
    id:number
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsBoolean()
    state:boolean
}

export class CreatePersonTypeDto extends PartialType(PersonTypeDto){
    @IsNotEmpty()
    @IsString()
    name: string
}
