import { Search } from "src/intefaces/Search.interface";
import { Equal } from "typeorm";
export const SearchQueries = (querie: any = {}) => {
    querie = JSON.parse(querie);
    console.log(querie)
    const search: Search = {};
    for (const key in querie) {
        if (querie[key] !== undefined) {
            search[key] = Equal(`${querie[key]}`)
        }
    }
    return search ? search : {};
}