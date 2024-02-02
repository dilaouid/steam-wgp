import { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Library } from "../../../context";
import styled from "styled-components";

const ConfirmButton = styled.button`
    z-index: 3;
    font-size: 16px;
    margin: 24px;
    margin-bottom: 74px;
    border-radius: 10px;
`;

export default function ConfirmButtonLibraryComponent() {
    const [ loading, setLoading ] = useState(false);
    const { library } = useContext(Library.Context)!;
    const { t } = useTranslation();

    const selectedLength = library?.selected?.length || 0;

    return(
        <ConfirmButton className={`btn btn-outline-primary position-fixed bottom-0 ${selectedLength === 0 ? 'disabled' : ''}`} type="button" disabled={selectedLength === 0}>
            { loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> }
            { !loading && selectedLength > 0 ? ' ' + t('confirm_library_changes') : ' ' + t('no_changes_library') }
        </ConfirmButton>
    )
}