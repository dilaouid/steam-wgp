/* eslint-disable @typescript-eslint/no-explicit-any */
export interface APIResponse {
    data: any;
    message: string;
}

export interface IMessage {
    message: string;
    type: 'error' | 'success';
    complete: boolean;
}