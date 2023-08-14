import { Career } from "src/entitys/career.entity";
import { Person } from "src/entitys/person.entity";

export class CreateGroup{
    id?:number
    code:number
    dateStart:Date
    dateEnd: Date
    state: boolean
    career?: Career
}

export class UpdateGroupDto{
    id:number
    code?:number
    dateStart?:Date
    dateEnd?: Date
    state?: boolean
    career?: Career
}