import { useState } from "react";

import { Input } from "@/components/ui/input";
import { IPaginationInputProps } from "./PaginationInput.props";

export const PaginationInput = ({
  current,
  total,
  onSubmit,
}: IPaginationInputProps) => {
  const [value, setValue] = useState(current.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(value);
    if (page >= 1 && page <= total) {
      onSubmit(page);
    } else {
      setValue(current.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="number"
        min={1}
        max={total}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-20 text-center"
      />
      <span className="text-sm text-gray-500">/ {total}</span>
    </form>
  );
};
