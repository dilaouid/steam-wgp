import { Pagination } from "@/components/common/molecules/Pagination/Pagination";
import { PlayerCard } from "@/components/features/molecules/players/PlayerCard/PlayerCard";
import { IPlayerListProps } from "./PlayerList.props";
import { PlayerListSkeleton } from "../../molecules/players/PlayerListSkeleton/PlayerListSkeleton";

export const PlayerList = ({
  players,
  pagination,
  onPageChange,
  isLoading,
}: IPlayerListProps) => {
  if (isLoading) {
    return <PlayerListSkeleton />;
  }

  console.log("PlayerList", players, pagination);
  

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {players.map((player) => (
          <PlayerCard key={player.id} {...player} />
        ))}
      </div>

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.total_pages}
        onPageChange={onPageChange}
        className="mt-8"
      />
    </div>
  );
};
