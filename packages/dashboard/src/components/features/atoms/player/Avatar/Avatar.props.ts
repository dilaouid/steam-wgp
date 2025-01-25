export interface IAvatarProps {
    hash: string;
    isSiteAdmin?: boolean;
    isSteamderAdmin?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}