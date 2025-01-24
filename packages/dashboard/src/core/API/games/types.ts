/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult } from "@tanstack/react-query";

export type TQueryParams = {
    offset?: number;
    limit?: number;
    onlyIsSelectable?: boolean;
    onlyNotSelectable?: boolean;
    search?: string;
    sort?: 'asc' | 'desc';
    order?: string;
}

type TCreateGameParams = {
    id: number;
    is_selectable: boolean;
};

export interface IUseGameMutationsReturn {
    createGame: UseMutationResult<any, Error, TCreateGameParams>;
    updateGame: UseMutationResult<any, Error, TCreateGameParams>;
}
