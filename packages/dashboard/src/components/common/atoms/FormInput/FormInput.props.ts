import { ChangeEvent } from "react";

export interface IFormInputProps {
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}