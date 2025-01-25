import { PlayerFilters } from "@/components/features/molecules/players/PlayerFilters/PlayerFilters";
import { PlayerList } from "@/components/features/organisms/players/PlayerList";
import { TQueryParams } from "@/core/API/players/types";
import { usePlayers } from "@/core/hooks/players/usePlayers";
import { useState } from "react";

export const PlayersPage = () => {
  const [queryParams, setQueryParams] = useState<TQueryParams>({
    page: 1,
    limit: 20,
    sort_field: "username",
    sort_order: "asc",
  });

  const { data, isLoading } = usePlayers(queryParams);

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Joueur{data?.pagination.total > 1 && "s"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {data?.pagination.total ?? 0} joueur{data?.pagination.total > 1 && "s"} inscrit{data?.pagination.total > 1 && "s"}
          </p>
        </div>

        <PlayerFilters
          onFilterChange={(newFilters) => {
            setQueryParams((prev) => ({ ...prev, ...newFilters, page: 1 }));
          }}
          currentFilters={queryParams}
        />
      </div>

      <PlayerList
        players={data?.players ?? []}
        pagination={data?.pagination}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
};
