import { cn } from "@/core/utils";
import { IPaginationButtonProps } from "./PaginationButton.props";

export const PaginationButton = ({
  onClick,
  disabled,
  active,
  children,
}: IPaginationButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "h-10 px-4 rounded-lg transition-colors",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      active
        ? "bg-indigo-500 text-white"
        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
    )}
  >
    {children}
  </button>
);
