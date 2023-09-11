import { ICustomResponse } from "src/intefaces/customResponse.interface";

/**
 * 
 * @param param Object of type ICustomResponse
 * @returns ICustomResponse
 */
export const customResponse = ({ status, message, data, meta }: ICustomResponse): ICustomResponse => ({
    status,
    message,
    data,
    meta
});