import { Users, Gamepad } from "lucide-react";

export const PlayerStats = ({
  library_size,
  steamders_completed,
}: {
  library_size: number;
  steamders_completed: number;
}) => (
  <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400">
    <div className="flex items-center gap-1">
      <Gamepad className="w-4 h-4" />
      <span>{library_size} jeux</span>
    </div>
    <div className="flex items-center gap-1">
      <Users className="w-4 h-4" />
      <span>{steamders_completed} steamders</span>
    </div>
  </div>
);
