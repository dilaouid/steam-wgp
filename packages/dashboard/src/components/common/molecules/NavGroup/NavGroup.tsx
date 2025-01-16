import { NavGroupProps } from "./NavGroup.props";
import { cn } from "@core/utils";

export const NavGroup = ({ title, children, collapsed }: NavGroupProps) => {
  return (
    <div className="space-y-1">
      {title && !collapsed && (
        <h2 className={cn(
          "px-3 mb-2",
          "text-xs font-semibold tracking-wider",
          "text-gray-500 dark:text-gray-400",
          "uppercase"
        )}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};