import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Nav } from './Nav';
import { Home } from './Home';
import { Topic } from './Topic';
import { Article } from './Article';
import { getDatabase, ref, set as firebaseSet, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Config';
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { Auth } from './Auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

function App() {

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [bookmarks, setBookmarks] = useState({});
  const [bookmarkLink, setBookmarkLink] = useState('');


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUsername(firebaseUser.displayName);
        console.log(username);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  /* useEffect(() => {
        if (auth.currentUser) {
            const bookmarksRef = ref(db, `userData/${auth.currentUser.uid}/bookmarks`);
            const unsub = onValue(bookmarksRef, (snapshot) => {
                const bookmarksData = snapshot.val();
                setBookmarks(bookmarksData || {});
            });

            // Cleanup function
            return () => unsub();
        }
    }, [bookmarkLink]); */

  function saveBookmarkCallback(bookmarkInfo, link, exists) {
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        let bookmarkRef = ref (db, `userData/${auth.currentUser.uid}/bookmarks/${bookmarkInfo.subtopic}`)
        const bookmark = !exists ? ({
            title: bookmarkInfo.title,
            bookmarkLink: link,
            }) : (null);
          firebaseSet(bookmarkRef, bookmark)
            .then(() => {setBookmarkLink(''); console.log(bookmarkLink)})
            .catch((error) => console.log('Error: ', error));
          }
    }

  return (
    <div className="app">
      <header>
        <Nav bookmarks={bookmarks} />
      </header>
    
      <main>
        <div className="container">
          <Routes>
            {/* Needs code - Will welcome users and show previews of the topics */}
            <Route index element={<Home />} />
            <Route path="login-register" element={<Auth />} />
            {/* Shows the topic and previews of articles under that topic */}
            <Route exact path=":topic" element={<Topic topics={['commuters', 'new-students', 'greek-life']} callback={saveBookmarkCallback}/>} />
            <Route path=":topic/:subtopic" element={<Article />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>

      <footer className="container">
        <p>&copy; 2024 Grant Branstetter, Amber Carbajal, & Celestine Le</p>
      </footer>
    </div>
  );
}

export default App;
