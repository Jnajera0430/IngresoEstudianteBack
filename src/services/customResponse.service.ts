/**
 * Interface
 * 
 */
export interface ICustomResponse {
    status?: number,
    message?: string,
    data?: any | Promise<any>
}
/**
 * 
 * @param param Object of type ICustomResponse
 * @returns ICustomResponse
 */
export const customResponse = ({ status, message, data }: ICustomResponse): ICustomResponse => ({
    status,
    message,
    data
});