import { Link } from "@tanstack/react-router";
import { NavLinkProps } from "./NavLink.props";
import { cn } from "@core/utils";

export const NavLink = ({
  to,
  icon: Icon,
  label,
  isActive,
  collapsed,
  external
}: NavLinkProps) => {
  const Component = external ? 'a' : Link;
  const linkProps = external ? { href: to, target: "_blank", rel: "noopener" } : { to };

  return (
    <Component
      {...linkProps}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2",
        "transition-all duration-200 ease-in-out",
        "text-gray-700 dark:text-gray-300",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        {
          "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400": isActive,
          "justify-center": collapsed,
        }
      )}
    >
      <Icon 
        size={20} 
        className={cn({
          "text-indigo-600 dark:text-indigo-400": isActive
        })}
      />
      {!collapsed && <span className="font-medium">{label}</span>}
    </Component>
  );
};
