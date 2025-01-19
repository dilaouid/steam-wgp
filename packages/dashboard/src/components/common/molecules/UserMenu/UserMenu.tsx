import { useRef, useState } from "react";
import { LogOut } from "lucide-react";

import { Avatar } from "@ui/atoms/Avatar";
import { useOnClickOutside } from "@core/hooks/useOnClickOutside";
import { cn } from "@core/utils";
import { IUserMenuProps } from "./UserMenu.props";

export const UserMenu = ({ username, avatarHash, onLogout }: IUserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="font-medium text-gray-700 dark:text-gray-200 hidden md:block">
          {username}
        </span>
        <Avatar hash={avatarHash} />
      </button>

      {isOpen && (
        <div className={cn(
          "absolute right-0 mt-2 w-48",
          "bg-white dark:bg-gray-800",
          "rounded-lg shadow-lg",
          "border border-gray-200 dark:border-gray-700",
          "py-1"
        )}>
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className={cn(
              "w-full px-4 py-2",
              "flex items-center gap-2",
              "text-left text-gray-700 dark:text-gray-200",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              "transition-colors"
            )}
          >
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>
        </div>
      )}
    </div>
  );
};