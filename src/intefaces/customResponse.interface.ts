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