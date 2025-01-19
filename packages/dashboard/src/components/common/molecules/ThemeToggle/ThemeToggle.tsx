import { Moon, Sun } from "lucide-react";
import { useTheme } from "@core/hooks/useTheme";
import { cn } from "@core/utils";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={cn(
        "p-2 rounded-lg transition-colors",
        "text-gray-700 dark:text-gray-200",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
      )}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};