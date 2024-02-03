import { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Library } from "../../../context";
import styled from "styled-components";
import { updateHiddenGames } from "../../../api/library";

const ConfirmButton = styled.button`
    z-index: 3;
    font-size: 16px;
    margin: 24px;
    margin-bottom: 74px;
    border-radius: 10px;
`;

export default function ConfirmButtonLibraryComponent() {
    const [ loading, setLoading ] = useState(false);
    const { library, setLibrary } = useContext(Library.Context)!;
    const { t } = useTranslation();

    const selectedLength = library?.selected?.length || 0;

    const confirmChanges = async () => {
        setLoading(true);
        try {
            await updateHiddenGames(library?.selected || []);
            if (library) {
                const updatedLibrary = library.games.map((game) => {
                    if (library.selected?.includes(game.game_id))
                        return { ...game, hidden: !game.hidden };
                    return game;
                });
                setLibrary({ ...library, games: updatedLibrary, selected: [] });
            }
        } catch (error) {
            console.error('Error updating hidden games', error);
        }
        setLoading(false);
    };

    return(
        <ConfirmButton onClick={confirmChanges} className={`btn btn-outline-primary position-fixed bottom-0 ${selectedLength === 0 ? 'disabled' : ''}`} type="button" disabled={selectedLength === 0}>
            { loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> }
            { !loading && selectedLength > 0 ? ' ' + t('confirm_library_changes') : ' ' + t('no_changes_library') }
        </ConfirmButton>
    )
}