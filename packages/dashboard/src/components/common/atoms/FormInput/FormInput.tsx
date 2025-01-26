import { Input,  } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { IFormInputProps } from "./FormInput.props";

export const FormInput = ({ label, value, onChange }: IFormInputProps) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Input value={value} onChange={onChange} />
  </div>
);
