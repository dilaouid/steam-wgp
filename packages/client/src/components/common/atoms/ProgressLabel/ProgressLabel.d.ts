export interface ProgressLabelComponentProps {
    type: 'info' | 'danger' | 'success';
    message: string;
    last: boolean;
    complete: boolean;
    count?: number;
}