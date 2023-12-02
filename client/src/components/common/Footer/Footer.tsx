import './Footer.css'

export default function FooterComponent() {
    return(
        <footer className="text-center py-4" data-aos="fade-up" data-aos-offset="5" data-aos-once="true">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-primary-emphasis align-self-center">
                        <p className="d-inline">Ce site <strong>n'est pas associé</strong> à Valve Corp.</p>
                    </div>
                </div>
            </div>
        </footer>);
}