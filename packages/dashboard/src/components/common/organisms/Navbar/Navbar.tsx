import { useAuthStore } from "@steamwgp/shared-ui";

import { ThemeToggle } from "@ui/molecules/ThemeToggle/ThemeToggle";
import { UserMenu } from "@ui/molecules/UserMenu";

export const Navbar = () => {
  const { user } = useAuthStore();
  
  const handleLogout = () => {
    // redirect to logout (todo)
  };

  return (
    <nav className="fixed top-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="h-16 mx-auto max-w-7xl px-4 lg:px-10 flex">
        {/* Côté gauche */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>

        {/* Côté droit */}
        <div className="flex items-center">
          {user && (
            <UserMenu 
              username={user.username} 
              avatarHash={user.avatar_hash}
              onLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </nav>
  );
};