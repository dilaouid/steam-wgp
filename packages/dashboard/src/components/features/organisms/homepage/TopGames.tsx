import { IStats, useStats } from "@steamwgp/shared-ui";

import { BASE_URL } from "@core/environment";
import { GameCardSkeleton } from "@features/atoms/homepage";
import { TopGameCard } from "@features/molecules/homepage";

export const TopGames = ({ podium, totalSteamders }: { podium: IStats["podium"], totalSteamders: number }) => {
  const { isLoading } = useStats({ baseUrl: BASE_URL });

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Top Jeux
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
          </>
        ) : (
          podium.map((game, index) => (
            <TopGameCard
              key={game.game_id}
              gameId={game.game_id}
              score={game.score}
              rank={index + 1}
              totalSteamders={totalSteamders}
            />
          ))
        )}
      </div>
    </div>
  );
};
