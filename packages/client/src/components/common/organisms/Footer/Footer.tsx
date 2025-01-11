import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

import { Modal, Button, Spinner } from "react-bootstrap";

import { GithubIcon } from "components/common/atoms/Icons/Footer/Github/Github";
import { CashIcon } from "components/common/atoms/Icons/Footer/Cash/Cash";

import { useAuthStore } from "@store/authStore";

import { useDeleteUser } from "core/hooks/useDeleteUser";
import { logout } from "@core/services/api/global/auth/logoutApi";
import { drawToast } from "@core/utils/drawToast";

const flags = {
    fr: 'https://flagicons.lipis.dev/flags/4x3/fr.svg',
    en: 'https://flagicons.lipis.dev/flags/4x3/gb.svg',
    es: 'https://flagicons.lipis.dev/flags/4x3/es.svg',
    jp: 'https://flagicons.lipis.dev/flags/4x3/jp.svg',
    de: 'https://flagicons.lipis.dev/flags/4x3/de.svg'
}; 

export const Footer: React.FC = () => {
    const [ show, setShow ] = useState<boolean>(false);
    const { isAuthenticated, setUser, toggleAuth } = useAuthStore();
    const { t, i18n } = useTranslation('global/footer');
    const router = useRouterState();
    const navigate = useNavigate();
    const deleteUserMutation = useDeleteUser();

    const changeLanguage = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
    };

    const handleClose = () => setShow(false);
    const handleDelete = () => {
        deleteUserMutation.mutateAsync().then(() => {
            handleClose();
            toggleAuth(false);
            setUser(null);
            logout();
            navigate({ to: '/' });
            drawToast('account_deleted', 'success');
        })
    }

    return( router.location.pathname === '/login' ? <></> : <>
        { isAuthenticated && <Modal show={show} centered onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ t('delete.title') }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Trans t={t} i18nKey="delete.body" components={{ 1: <strong className="text-warning" /> }} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleDelete} variant="danger" disabled={deleteUserMutation.isPending}>{ 
                    deleteUserMutation.isPending ? <Spinner variant="light" animation="border" size="sm" /> : t('delete.confirm')
                }</Button>
                <Button variant="secondary" onClick={handleClose} disabled={deleteUserMutation.isPending}>{ t('delete.no') }</Button>
            </Modal.Footer>
        </Modal> }
        <footer className="text-center">
            <div className="container text-muted py-4 py-lg-5">
                <ul className="list-inline">
                    <li className="list-inline-item me-4">
                        <Link className="link-secondary" to="/cgu" activeProps={{ className: 'active text-decoration-none opacity-25' }}>{ t('cgu') }</Link>
                    </li>
                    <li className="list-inline-item me-4">
                        <Link className="link-secondary" to="/legals" activeProps={{ className: 'active text-decoration-none opacity-25' }}>{ t('legals') }</Link>
                    </li>
                    <li className="list-inline-item">
                        <a target='_blank' className="link-secondary" href="https://github.com/dilaouid/steam-wgp/issues">{ t('bug') }</a>
                    </li>
                </ul>

                { isAuthenticated && 
                    <ul>
                        <li className="list-inline-item">
                            <span onClick={() => setShow(true)} role="button" className="link-danger">{ t('delete.link') }</span>
                        </li>
                    </ul>
                }
                <ul className="list-inline" role="list">
                    <li className="list-inline-item">
                        <a title="Github repository" target='_blank' className="link-secondary" href="https://github.com/dilaouid/steam-wgp"><GithubIcon /></a>
                    </li>
                    <li className="list-inline-item">
                        <a title="Support the project through Ko-Fi" target='_blank' className="link-secondary" href="https://ko-fi.com/dilaouid"><CashIcon /></a>
                    </li>
                </ul>
                <div className="flags-container">
                        {Object.entries(flags).map(([code, url]) => (
                            <img
                                key={code}
                                src={url}
                                alt={code}
                                style={{ opacity: i18n.resolvedLanguage === code ? 1 : 0.5, cursor: 'pointer', width: 24, height: 24, margin: 4, filter: i18n.resolvedLanguage === code ? 'grayscale(0)' : 'grayscale(.5)'}}
                                onClick={() => changeLanguage(code)}
                            />
                        ))}
                    </div>
                <p className="mb-0">{ t('copy') }</p>
                <p className="mb-0 text-secondary">{ t('not_affiliated') }</p>
            </div>
        </footer>
    </>)
};