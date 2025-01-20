import { createFileRoute } from '@tanstack/react-router'
import { useStats } from '@steamwgp/shared-ui';

import { BASE_URL } from '@core/environment';
import { StatsOverview } from '@features/organisms/homepage/StatsOverview'
import { TopGames } from '@features/organisms/homepage/TopGames'

export const Route = createFileRoute("/")({
    component: DashboardLayout
});

function DashboardLayout () {  
  const { data: stats, isLoading } = useStats({ baseUrl: BASE_URL });

  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Vue d'ensemble
      </h1>
      
      <StatsOverview stats={stats} isLoading={isLoading} />
      { stats && <TopGames podium={stats.podium} totalSteamders={stats.matches} /> }
    </div>
  )
}