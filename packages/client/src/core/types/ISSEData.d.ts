export interface ISSEData {
    message: string;
    type: "info" | "danger" | "success";
    complete: boolean;
    count?: number;
    progress: number;
}