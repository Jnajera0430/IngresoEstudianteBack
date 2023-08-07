import { Group } from "src/entitys/group.entity";

export class CreateCareerDto{
    id?:number;
    name: string;
    group?: Group[];
}

export class UpdateOrFindCareer{
    id?:number;
    name?: string;
    group?: Group[];
}
