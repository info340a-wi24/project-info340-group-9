import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Nav } from './Nav';
import { Home } from './Home';
import { Topic } from './Topic';
import { Article } from './Article';
import { getDatabase, ref, set as firebaseSet } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Config';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { Auth } from './Auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

function App() {

  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUsername(firebaseUser.displayName);
        setUser(firebaseUser);
        console.log(username);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  function saveBookmarkCallback(bookmarkInfo, link, exists) {
  
      if (user) {
        let bookmarkRef = ref (db, `userData/${auth.currentUser.uid}/bookmarks/${bookmarkInfo.subtopic}`)
        const bookmark = !exists ? ({
            title: bookmarkInfo.title,
            bookmarkLink: link,
            }) : (null);
          firebaseSet(bookmarkRef, bookmark)
            .then(() => {console.log("bookmark edited")})
            .catch((error) => console.log('Error: ', error));
          }
    }

  return (
    <div className="app">
      <header>
        <Nav />
      </header>
    
      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login-register" element={<Auth />} />
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
