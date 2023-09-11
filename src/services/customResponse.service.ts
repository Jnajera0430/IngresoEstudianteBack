/**
 * Interface
 * 
 */
export interface ICustomResponse {
    status?: number,
    message?: string,
    data?: any | Promise<any>,
    meta?: any | Promise<any>
}
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