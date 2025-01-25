import { Input } from "@/components/ui/input";
import { AddGameModal } from "./AddGameModal";
import { TQueryParams } from "@/core/API/games/types";
import { cn } from "@/core/utils";

export const GameFilters = ({
  onChange,
}: {
  onChange: (params: Partial<TQueryParams>) => void;
}) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex gap-4">
      <select
        onChange={(e) => {
          if (e.target.value === "selectable")
            onChange({ onlyIsSelectable: true, onlyNotSelectable: false });
          else if (e.target.value === "not-selectable")
            onChange({ onlyIsSelectable: false, onlyNotSelectable: true });
          else onChange({ onlyIsSelectable: false, onlyNotSelectable: false });
        }}
        className={cn(
          "rounded-lg border px-3 py-2",
          "bg-transparent",
          "bg-white dark:bg-gray-800",
          "text-gray-900 dark:text-gray-100",
          "border-gray-200 dark:border-gray-800"
        )}
      >
        <option value="all">Tous les jeux</option>
        <option value="selectable">Multijoueur</option>
        <option value="not-selectable">Solo</option>
      </select>

      <Input
        placeholder="Rechercher..."
        onChange={(e) => onChange({ search: e.target.value })}
        className="w-64"
      />
    </div>
    <AddGameModal />
  </div>
);
