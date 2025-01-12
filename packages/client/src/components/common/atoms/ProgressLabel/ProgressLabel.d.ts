export interface ProgressLabelComponentProps {
    type: string;
    message: string;
    last: boolean;
    complete: boolean;
    count?: number;
}