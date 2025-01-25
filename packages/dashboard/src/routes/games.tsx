import { createFileRoute } from "@tanstack/react-router";

import { GamesGrid } from "@features/organisms/games/GameGrid";
import { TQueryParams } from "@core/API/games/types";

export const Route = createFileRoute('/games')({
  validateSearch: (search: Record<string, unknown>): TQueryParams => ({
    limit: Number(search?.limit) || 18,
    offset: Number(search?.offset) || 0,
    onlyIsSelectable: Boolean(search?.onlyIsSelectable),
    onlyNotSelectable: Boolean(search?.onlyNotSelectable),
    search: String(search?.search || ''),
    sort: (search?.sort as 'asc' | 'desc') || 'asc',
    order: String(search?.order || ''),
  }),
  component: GamesLayout,
 });
 

function GamesLayout() {
  return <GamesGrid />;
}
