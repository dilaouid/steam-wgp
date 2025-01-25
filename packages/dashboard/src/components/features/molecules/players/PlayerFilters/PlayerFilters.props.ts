import { TQueryParams } from "@/core/API/players/types";

export interface IPlayerFiltersProps {
    onFilterChange: (filters: Partial<TQueryParams>) => void;
    currentFilters: TQueryParams;
}