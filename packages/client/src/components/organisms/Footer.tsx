import { Link, useRouterState } from "@tanstack/react-router";
import { GithubIcon } from "../atoms/icons/footer/GithubIcon";
import { CashIcon } from "../atoms/icons/footer/CashIcon";
import { useTranslation } from "react-i18next";

const flags = {
    fr: 'https://flagicons.lipis.dev/flags/4x3/fr.svg',
    en: 'https://flagicons.lipis.dev/flags/4x3/gb.svg',
    es: 'https://flagicons.lipis.dev/flags/4x3/es.svg',
    jp: 'https://flagicons.lipis.dev/flags/4x3/jp.svg',
    de: 'https://flagicons.lipis.dev/flags/4x3/de.svg',
};

export const Footer: React.FC = () => {
    const { t, i18n } = useTranslation('global/footer');
    const router = useRouterState();

    const changeLanguage = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
    };

    return( router.location.pathname === '/login' ? <></> : <>
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
                <ul className="list-inline">
                    <a target='_blank' className="link-secondary" href="https://github.com/dilaouid/steam-wgp"><GithubIcon /></a>
                    <a target='_blank' className="link-secondary" href="https://ko-fi.com/dilaouid"><CashIcon /></a>
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
            </div>
        </footer>
    </>)
};