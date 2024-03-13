import { Link } from "@tanstack/react-router";
import { GithubIcon } from "../atoms/icons/footer/GithubIcon";
import { CashIcon } from "../atoms/icons/footer/CashIcon";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
    const { t } = useTranslation('global/footer');

    return(<><hr />
        <footer className="text-center">
            <div className="container text-muted py-4 py-lg-5">
                <ul className="list-inline">
                    <li className="list-inline-item me-4">
                        <Link className="link-secondary" to="/">{ t('cgu') }</Link>
                    </li>
                    <li className="list-inline-item me-4">
                        <Link className="link-secondary" to="/">{ t('legals') }</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="link-secondary" to="/">{ t('bug') }</Link>
                    </li>
                </ul>
                <ul className="list-inline">
                    <a target='_blank' className="link-secondary" href="https://github.com/dilaouid/steam-wgp"><GithubIcon /></a>
                    <a target='_blank' className="link-secondary" href="https://ko-fi.com/dilaouid"><CashIcon /></a>
                </ul>
                <p className="mb-0">{ t('copy') }</p>
            </div>
        </footer>
    </>)
};