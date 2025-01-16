import { ChevronLeft, ChevronRight } from "lucide-react";
import { SidebarToggleProps } from "./SidebarToggle.props";

export const SidebarToggle = ({ collapsed, onToggle }: SidebarToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="absolute -right-3 top-6 hidden h-6 w-6 items-center justify-center rounded-full border bg-white dark:bg-gray-800 dark:border-gray-700 lg:flex"
    >
      {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
    </button>
  );
};