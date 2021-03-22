import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

const Header = ({auth}) => {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider).catch(e => {});
    }
    return(
        <header>
            <Link className="logo" to="/">
                <span>note<span>Space</span></span>
            </Link>
            <ul>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/contacts">
                        Contacts
                    </Link>
                </li>
                <li>
                    <Link to="/extra">
                        Extra
                    </Link>
                </li>
                <li>
                    <Link to="/" onClick={signInWithGoogle}>
                        Sign In
                    </Link>                  
                </li>
            </ul>
      </header>
    );
}

export default Header;