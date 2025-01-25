import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Crown } from "lucide-react";
import { useState } from "react";
import { IPlayerFiltersProps } from "./PlayerFilters.props";

import { debounce } from "lodash";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TQueryParams } from "@/core/API/players/types";

export const PlayerFilters = ({
  onFilterChange,
  currentFilters,
}: IPlayerFiltersProps) => {
  const [search, setSearch] = useState(currentFilters.search ?? "");

  const handleSearchChange = debounce((value: string) => {
    onFilterChange({ search: value || undefined });
  }, 300);

  const handleFilterToggle = (key: keyof TQueryParams) => {
    onFilterChange({ 
      [key]: currentFilters[key] ? null : true
    });
  };
 

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Rechercher un joueur..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearchChange(e.target.value);
          }}
          className="w-full md:w-64"
        />

        <Select
          value={currentFilters.sort_field}
          onValueChange={(value) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onFilterChange({ sort_field: value as any })
          }
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="username">Nom d'utilisateur</SelectItem>
            <SelectItem value="steamders_completed">
              Steamders complétés
            </SelectItem>
            <SelectItem value="library_size">Taille bibliothèque</SelectItem>
            <SelectItem value="created_at">Date d'inscription</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={currentFilters.sort_order}
          onValueChange={(value) =>
            onFilterChange({ sort_order: value as "asc" | "desc" })
          }
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Ordre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Croissant</SelectItem>
            <SelectItem value="desc">Décroissant</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={currentFilters.has_active_steamder ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterToggle('has_active_steamder')}

        >
          <Activity className="w-4 h-4 mr-2" />
          En Steamder
        </Button>

        <Button
          variant={currentFilters.is_admin ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterToggle('is_admin')}
        >
          <Crown className="w-4 h-4 mr-2" />
          Admins
        </Button>
      </div>
    </div>
  );
};
