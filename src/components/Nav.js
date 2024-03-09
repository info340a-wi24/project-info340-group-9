import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faBookmark } from '@fortawesome/free-solid-svg-icons'; // Import the bookmark icon */
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Config';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function Nav() {

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [menuClicked, setMenuClicked] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            setUser(firebaseUser);
            setUsername(firebaseUser.displayName);
            console.log(firebaseUser.displayName);
          } else {
            setUser(null);
          }
        });
    
        return () => unsubscribe();
      }, []);

    function handleClick() {
        if (!menuClicked) {
            setMenuClicked(true);
        } else {
            setMenuClicked(false);
        }
    }

    function menuOff() {
        setMenuClicked(false)
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setEmail('');
            setPassword('');
            setUsername('');
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <nav>
            <div className="nav-container">

                {/* bookmark component should be implemented here.
                The icon below is currently not interactive. 
                Bookmark will also require responsive css based on the nav-menu format. See below. */}
                 {/* Dropdown container */}
                 <div className="dropdown-container">
                    <div className="bookmark" onClick={menuOff}>
                        {/* Bookmark icon */}
                        <i className="fas fa-bookmark" aria-label="bookmarks"></i>
                    </div>

                    {/* Dropdown content */}
                    <div className="dropdown-content">
                        <NavLink to="page1">Page 1</NavLink>
                        <NavLink to="page2">Page 2</NavLink>
                        <NavLink to="page3">Page 3</NavLink>
                    </div>
                </div>

                <div className="website-title">
                    <h1 className="title"><NavLink to="/">UW Wiki</NavLink></h1>
                </div>

                {/* interactive hamburger menu will display only on mobile
                but css still needs to be made responsive */}
                <div id="hamburger-menu" onClick={handleClick}><i className="fa fa-bars" aria-label="side-menu"></i></div>
                {menuClicked ? (
                    <div id="side-nav">
                        <ul className="nav-links list-unstyled">
                            {user ? <li><h2>Welcome, {username}</h2></li> : (null)}
                            <NavLink to="/" onClick={menuOff}>HOME</NavLink>
                            <NavLink tSo="commuters" onClick={menuOff}>COMMUTERS</NavLink>
                            <NavLink to="new-students" onClick={menuOff}>NEW STUDENTS</NavLink>
                            <NavLink to="greek-life" onClick={menuOff}>GREEK LIFE</NavLink>
                            <NavLink to="login-register" onClick={menuOff}>{user ? <Button onClick={handleSignOut}>LOG OUT</Button> : <Button>REGISTER/SIGN UP</Button>}</NavLink>
                        </ul>
                    </div>
                ) : (null)}

                {/* Nav links will be arranged as a bar for larger screen.
                Currently does not display because css is not responsive yet*/}
                <div className="nav-links">
                    <ul>
                        <NavLink to="home">HOME</NavLink>
                        <NavLink to="commuters">COMMUTERS</NavLink>
                        <NavLink to="new-students">NEW STUDENTS</NavLink>
                        <NavLink to="greek-life">GREEK LIFE</NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    )
}