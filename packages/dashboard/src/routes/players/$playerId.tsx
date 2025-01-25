import { createFileRoute } from '@tanstack/react-router'
import { PlayerPage } from '@layouts/templates/PlayerPage'

export const Route = createFileRoute('/players/$playerId')({
  loader: ({ params }) => params.playerId,
  component: PlayerDetails,
})

function PlayerDetails() {
  const { playerId } = Route.useParams()

  return <PlayerPage playerId={playerId} />
}
