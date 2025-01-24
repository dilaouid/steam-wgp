export interface IGameCardProps {
    id: number
    isSelectable: boolean
    onToggle: () => void
    isLoading?: boolean
}