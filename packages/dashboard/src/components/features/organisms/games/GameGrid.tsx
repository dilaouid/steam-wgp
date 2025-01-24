import { TQueryParams, useGameMutations } from "@core/API/games";
import { useGames } from "@core/hooks/games/useGames";
import { IGame } from "@core/types/Game";
import { Route } from "@/routes/games";

import { GameFilters } from "@features/molecules/games/GameFilters";
import { GameCard } from "@features/atoms/games/GameCard";
import { Pagination } from "@ui/molecules/Pagination/Pagination";
import { useNavigate } from "@tanstack/react-router";

export const GamesGrid = () => {
  const search = Route.useSearch();
  const navigate = useNavigate();
  
  const { updateGame } = useGameMutations();

  const pageSize = 18;

  const params = {
    ...search,
    limit: 18,
    offset: search.offset || 0,
  };

  const { data, isLoading } = useGames(params);

  const setPage = (page: number) => {
    navigate({
      search: {
        ...search,
        offset: (page - 1) * pageSize,
      },
    });
  };

  const updateParams = (newParams: Partial<TQueryParams>) => {
    navigate({
      search: {
        ...search,
        ...newParams,
        offset: 0,
      },
    });
  };

  const currentPage = Math.floor(params.offset / pageSize) + 1;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <GameFilters onChange={updateParams} />
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
      >
        {isLoading
          ? Array(18)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse rounded-xl h-[400px]"
                />
              ))
          : data?.data.map((game: IGame) => (
              <GameCard
                key={game.id}
                id={game.id}
                isSelectable={game.is_selectable}
                onToggle={() =>
                    updateGame.mutate({
                        id: game.id,
                        is_selectable: !game.is_selectable,
                    })
                }
                isLoading={updateGame.isPending}
              />
            ))}
      </div>

      {data && (
        <Pagination
          currentPage={currentPage}
          totalPages={data?.meta.pageCount ?? 0}
          onPageChange={setPage}
          className="mt-8"
        />
      )}
    </div>
  );
};
