import { Device } from "src/entitys/device.entity";
import { DoctType } from "src/entitys/doctType.entity";
import { Group } from "src/entitys/group.entity";
import { PersonType } from "src/entitys/person_type.entity";
import { Record_entry } from "src/entitys/record_entry.entity";
import { Vehicle } from "src/entitys/vehicle.entity";

export class PersonDto {
    id?: number;
    firtsName: string;
    lastName: string;
    document: string;
    state: boolean;
    groups: Group[] | null;
    personTypes: PersonType | null;
    device: Device[] | null;
    vehicles: Vehicle[] | null;
    recordEntry: Record_entry[] | null;
}

export class CreatePerson {
    id?: number;
    firtsName: string;
    lastName: string;
    document: string;
    state?: boolean;
    docType?: DoctType | null;
    personTypes?: PersonType | null;
    groups?: Group[] | null;
    device?: Device[] | null;
    vehicles?: Vehicle[] | null;
    recordEntry?: Record_entry[] | null;
}

export class UpdatePerson {
    id: number;
    firtsName?: string;
    lastName?: string;
    document?: string;
    state?: boolean;
    docType?: DoctType | null;
    personTypes?: PersonType | null;
    groups?: Group[] | null;
    device?: Device[] | null;
    vehicles?: Vehicle[] | null;
    recordEntry?: Record_entry[] | null;
}

//export type CreatePerson=Partial<PersonDto>
//export type UpdatePerson = Partial<PersonDto>