export interface IPaginationInputProps {
    current: number;
    total: number;
    onSubmit: (page: number) => void;
}
