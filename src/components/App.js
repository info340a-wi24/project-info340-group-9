import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  signOut
} from 'firebase/auth';
import { Auth } from './Auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

function App() {

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUsername(firebaseUser.displayName);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <header>
        <Nav />
      </header>
    
      <main className="container">
        <div className="">
          <Routes>
            {/* Needs code - Will welcome users and show previews of the topics */}
            <Route index element={<Home />} />
            <Route path="login-register" element={<Auth />} />
            {/* Shows the topic and previews of articles under that topic */}
            <Route path=":topic" element={<Topic topics={['commuters', 'new-students', 'greek-life']}/>} />
            <Route path=":topic/:subtopic" element={<Article />} />

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
