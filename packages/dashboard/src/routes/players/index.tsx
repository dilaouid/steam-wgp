import { TQueryParams } from '@/core/API/players/types'
import { PlayersPage } from '@layouts/templates/PlayersPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/players/')({
  validateSearch: (search: Record<string, unknown>): TQueryParams => {
    const sortField = String(search?.sort_field || 'username')
    const sortOrder = String(search?.sort_order || 'asc')

    return {
      limit: Number(search?.limit) || 18,
      page: Number(search?.page) || 1,
      has_active_steamder: Boolean(search?.has_active_steamder),
      is_admin: Boolean(search?.is_admin),
      min_games: Number(search?.min_games) || 0,
      sort_field: sortField as
        | 'username'
        | 'steamders_completed'
        | 'library_size'
        | 'created_at',
      sort_order: sortOrder as 'asc' | 'desc',
    }
  },
  component: PlayersPage,
})
