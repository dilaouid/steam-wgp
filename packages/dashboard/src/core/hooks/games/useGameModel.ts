/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useGameMutations } from '@/core/API/games/mutations';
import { useToast } from '@/hooks/use-toast';

export const useGameModal = () => {
    const [gameId, setGameId] = useState('');
    const [isSelectable, setIsSelectable] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { toast } = useToast();
    const { createGame } = useGameMutations();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createGame.mutateAsync({
                id: Number(gameId),
                is_selectable: isSelectable
            });
            toast({
                description: "Jeu ajouté avec succès",
                className: "bg-emerald-500 text-white"
            });
        } catch (error: any) {
            toast({
                description: error.message,
                variant: "destructive"
            });
        }
    };

    return {
        gameId,
        setGameId,
        isSelectable,
        setIsSelectable,
        previewUrl,
        setPreviewUrl,
        handleSubmit,
        isLoading: createGame.isPending
    };
};