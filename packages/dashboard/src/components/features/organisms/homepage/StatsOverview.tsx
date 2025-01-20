import { Users, GamepadIcon, Trophy, Star } from 'lucide-react';
import { IStats } from '@steamwgp/shared-ui';
import { StatCard } from '@features/atoms/homepage/StatCard';
import { StatSkeleton } from '@features/atoms/homepage';

export const StatsOverview = ({ stats, isLoading }: { stats?: IStats, isLoading: boolean }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {isLoading ? (
      <>
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </>
    ) : stats && (<>
        <StatCard
            title="Joueurs"
            value={stats.players}
            icon={<Users size={24} />}
        />
        <StatCard 
            title="Jeux"
            value={stats.games}
            icon={<GamepadIcon size={24} />}
        />
        <StatCard 
            title="Steamders complétées"
            value={stats.matches}
            icon={<Trophy size={24} />}
        />
        <StatCard 
            title="Steamders"
            value={stats.steamders}
            icon={<Star size={24} />}
        /> </>) }
  </div>
);
