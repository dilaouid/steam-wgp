import { ICompletedSteamder, ICurrentSteamder } from "@/core/types/Player";

export type TSteamderCardProps = {
    steamder: ICompletedSteamder | ICurrentSteamder;
    type: 'active' | 'completed';
}
