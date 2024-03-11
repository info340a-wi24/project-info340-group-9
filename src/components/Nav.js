import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faBookmark } from '@fortawesome/free-solid-svg-icons'; // Import the bookmark icon */
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Config';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getDatabase, ref, onValue, push, runTransaction } from 'firebase/database';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

export function Nav() {

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [menuClicked, setMenuClicked] = useState(false);
    const [bookmarks, setBookmarks] = useState({});
    const [showPopup, setShowPopup] = useState(false); // State for controlling pop-up visibility

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

    useEffect(() => {
        if (user) {
            const bookmarksRef = ref(db, `userData/${auth.currentUser.uid}/bookmarks`);
            const unsub = onValue(bookmarksRef, (snapshot) => {
                const bookmarksData = snapshot.val();
                setBookmarks(bookmarksData || {});
            });

            // Cleanup function
            return () => unsub();
        }
    }, []);

    const sortedKeys = Object.keys(bookmarks).sort((a, b) => {
        return bookmarks[b].timestamp - bookmarks[a].timestamp;
    });

    const handleBookmarkClick = () => {
        if (!user) {
            setShowPopup(true);
        } else {
            // Handle bookmark logic
        }
    };

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
                {/* Bookmark component */}
                <div className="dropdown-container">
                    <button aria-label="Bookmarks" className="bookmark" onClick={handleBookmarkClick}>
                        <span className="fas fa-bookmark"></span>
                    </button>
                    {/* Pop-up message */}
                    <div className={`popup ${showPopup ? 'show' : ''}`}>
                        <p>Please sign-in to use the bookmark feature</p>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                    <div className="dropdown-content">
                        {sortedKeys.map((bookmarkId) => (
                            <NavLink key={bookmarkId} to={bookmarks[bookmarkId].bookmarkLink}>
                                {bookmarks[bookmarkId].title}</NavLink>
                        ))}
                    </div>
                </div>

                <div className="website-title">
                    <h1 className="title"><NavLink to="/">UW Wiki</NavLink></h1>
                </div>

                {/* interactive hamburger menu will display only on mobile
                but css still needs to be made responsive */}
                <button id="hamburger-menu" aria-label="Side menu" onClick={handleClick}>
                    <span className="fa fa-bars"></span>
                </button>
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