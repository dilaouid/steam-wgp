import { ReactNode, useEffect, useState } from "react";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useAuthStore } from "../../store/authStore";
import { Loader } from "../atoms/Loader";
import { Modal, Button } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";


type AuthWrapperProps = {
    children: ReactNode;
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const [ show, setShow ] = useState<boolean>(true);
    const { data, isError, error, isSuccess, isFetched } = useCheckAuth();
    const { setUser, toggleAuth } = useAuthStore();
    const { t } = useTranslation('global/information', { keyPrefix: 'reset' });

    const isAlertedLibrary = localStorage.getItem('alertedLibrary');

    useEffect(() => {
        if (isError) {
            setUser(null);
            toggleAuth(false);
        } else {
            setUser(data);
            toggleAuth(true);
        }
    }, [isError, data, isSuccess, setUser, toggleAuth, error]);

    if (!isFetched)
        return <Loader />;

    return <>
        { !isAlertedLibrary &&
            <Modal show={show} onHide={() => localStorage.setItem('alertedLibrary', 'true')} centered animation>
                <Modal.Header>
                    <Modal.Title>{ t('header') }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Trans t={t} i18nKey="body" components={{ 1: <a className="text-decoration-none" href="https://twitter.com/LaouidD/status/1785045680295235762" target="_blank" />, 2: <strong className="fw-bold text-warning" />, 3: <p /> }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={() => {
                        setShow(false);
                        localStorage.setItem('alertedLibrary', 'true')
                    }}> { t('button') }</Button>
                </Modal.Footer>
            </Modal> }
        { children }
    </>;
};