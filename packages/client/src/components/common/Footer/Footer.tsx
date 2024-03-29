import './Footer.css'
import { Trans } from 'react-i18next';

export default function FooterComponent() {
    return(
        <footer className="text-center py-4" data-aos="fade-up" data-aos-offset="5" data-aos-once="true">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-primary-emphasis align-self-center">
                        <Trans
                            i18nKey='footer'
                            components={[<strong key="0" />]}
                        />
                    </div>
                </div>
            </div>
        </footer>);
}