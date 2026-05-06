import './Footer.css';

function Footer() {
    const isGerman = navigator.language.toLowerCase().startsWith('de');
    const label = isGerman ? 'Impressum' : 'Legal Notice';

    return (
        <footer className="app-footer">
            <details>
                <summary>{label}</summary>
                <address>
                    Thomas Baumgartl<br />
                    Amselweg 1<br />
                    92224 Amberg<br />
                    <a href="mailto:support@ipfinder.de">support@ipfinder.de</a>
                </address>
            </details>
        </footer>
    );
}

export default Footer;
