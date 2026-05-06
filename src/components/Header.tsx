import logo from '../assets/logo.svg';
import './Header.css';

function Header() {
    return (
        <header>
            <img src={logo} alt="ipfinder.de" className="app-logo" />
        </header>
    );
}

export default Header;
