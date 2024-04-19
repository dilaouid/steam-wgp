import { useMutation } from "@tanstack/react-query";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { BsCheckAll } from "react-icons/bs";

import { updateLibrary } from "../../../services/api/players/updateLibraryApi";
import { updateLibraryWS } from "../../../services/websocket/send";

import { useLibraryStore } from "../../../store/libraryStore";
import { drawToast } from "../../../utils/drawToast";

interface SubmitSelectedButtonProps {
    count: number;
}

export const SubmitSelectedButton: React.FC<SubmitSelectedButtonProps> = ({ count }) => {
    const { t } = useTranslation('pages/library', { keyPrefix: 'left_column.submit_selected_button' });
    const { library, setLibrary, selected, setSelected } = useLibraryStore();
    const updateMutation = useMutation({ mutationFn: updateLibrary, mutationKey: ['update', 'library'] });
    const message = count === 0 ? t('disabled') : t('enabled');
    
    const handleUpdateLibrary = async () => {
        try {
            if (count === 0 || updateMutation.isPending) return;
            updateMutation.mutateAsync(selected).then((data) => {
                const newLibrary = library.map(game => selected.includes(game.game_id) ? { ...game, hidden: !game.hidden } : game);
                setLibrary(newLibrary);
                setSelected([]);
                const publicGames = newLibrary.filter(game => !game.hidden).map(game => game.game_id);                
                updateLibraryWS(publicGames);
                drawToast(data.message, "success");
            });
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la bibliothèque :", err);
        }
    };

    const isDisabled = count === 0 || updateMutation.isPending;

    return (
        <Button
            variant={isDisabled ? 'secondary' : 'info'}
            disabled={isDisabled}
            onClick={handleUpdateLibrary}
        >
            { count > 0 && <BsCheckAll /> }
            { updateMutation.isPending ? t('loading') : message }
        </Button>
    );
};