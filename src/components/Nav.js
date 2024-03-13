import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons'; // Import the bookmark icon */
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Config';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, onValue, push, runTransaction } from 'firebase/database';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

export function Nav(props) {

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [bookmarkData, setBookmarkData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [bookmarkClicked, setBookmarkClicked] = useState(false);
    const [offBookmark, setOffBookmark] = useState(null);
    const [bookmarksOpen, setBookmarksOpen] = useState(false); // State for controlling pop-up visibility
    const menuRef = useRef();
    const menubtnRef = useRef();
    const bookmarkRef = useRef();
    const bookmarkbtnRef = useRef();
    const sortedKeys = Object.keys(bookmarkData)/* .sort((a, b) => {
        return bookmarkData[b].timestamp - bookmarkData[a].timestamp;
    }); */

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                setUsername(firebaseUser.displayName);
                const bookmarksRef = ref(db, `userData/${firebaseUser.uid}/bookmarks`);
                onValue(bookmarksRef, (snapshot) => {
                    const bookmarksData = snapshot.val();
                    setBookmarkData(bookmarksData || {});
                });
                console.log(firebaseUser.displayName);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (auth.currentUser) {
            const bookmarksRef = ref(db, `userData/${auth.currentUser.uid}/bookmarks`);
            const unsub = onValue(bookmarksRef, (snapshot) => {
                const bookmarksData = snapshot.val();
                setBookmarkData(bookmarksData || {});
            });

            // Cleanup function
            return () => unsub();
        }
    }, []);

    useEffect(() => {
        const ifClickedOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) && !menubtnRef.current.contains(event.target)) {
            setMenuOpen(false);
        }}
        document.addEventListener("mousedown", ifClickedOutside);

        return () => document.removeEventListener("mousedown", ifClickedOutside);
    }, [menuOpen])

    useEffect(() => {
        const ifClickedOutside = (event) => {
        if (bookmarkRef.current && !bookmarkRef.current.contains(event.target) && !bookmarkbtnRef.current.contains(event.target)) {
            setBookmarksOpen(false);
        }}
        document.addEventListener("mousedown", ifClickedOutside);

        return () => document.removeEventListener("mousedown", ifClickedOutside);
    }, [bookmarksOpen])

    function menuOff() {
        setMenuOpen(false);
    }

    function renderPopupContent() {
        if (user) {
            return  (
            <div id="bookmarks-list">
                <ul>
                    {sortedKeys.map((bookmarkID) => (
                <NavLink 
                key={bookmarkID} 
                to={bookmarkData[bookmarkID].bookmarkLink}
                onClick={() => setBookmarksOpen(false)}>
                    {bookmarkData[bookmarkID].title}
                </NavLink>
            ))}
                </ul> 
            </div>)
            
        } else {
            return (
            <div id="signin-popup">
                <NavLink to="login-register" onClick={() => setBookmarksOpen(false)}>
                <p>Sign in to view bookmarks</p></NavLink>
                <button onClick={() => setBookmarksOpen(false)} >Close</button>
            </div>
        )}
    }

    
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUsername('');
            setBookmarkData({});
        } catch (error) {
            setErrorMessage(error.message);
        }
    }


    return (
        <nav>
            <div className="nav-container">
                {/* Bookmark component */}
                <div id="bookmarks">
                    <button
                        ref={bookmarkbtnRef}
                        aria-label="Bookmarks"
                        className="bookmark-button"
                        onClick={() => setBookmarksOpen(!bookmarksOpen)}>
                            <span className="fa fa-bookmark nav-fa"></span>
                    </button>
                    <div className="bookmark-content" ref={bookmarkRef}>
                        {bookmarksOpen && renderPopupContent()} 
                    </div>
                    
                </div>

                <div id="website-title">
                    <h1 className="title"><NavLink to="/">UW Wiki</NavLink></h1>
                </div>

                {/* interactive hamburger menu will display only on mobile
                but css still needs to be made responsive */}
                <button
                id="side-menu-btn"
                aria-label="Side menu"
                ref={menubtnRef}
                onClick={() => setMenuOpen(!menuOpen)}>
                    <span className="fa fa-bars nav-fa"></span>
                </button>
                {menuOpen && (
                    <div id="side-nav" ref={menuRef}>
                        <ul className="side-links list-unstyled">
                            {user && <li><h2>Welcome, {username}</h2></li>}
                            <NavLink to="/" onClick={menuOff}>HOME</NavLink>
                            <NavLink to="commuters" onClick={menuOff}>COMMUTERS</NavLink>
                            <NavLink to="new-students" onClick={menuOff}>NEW STUDENTS</NavLink>
                            <NavLink to="greek-life" onClick={menuOff}>GREEK LIFE</NavLink>
                            <NavLink to="login-register" onClick={menuOff}>{user ? <Button onClick={handleSignOut}>LOG OUT</Button> : <Button>REGISTER/LOGIN</Button>}</NavLink>
                        </ul>
                    </div>
                )}

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