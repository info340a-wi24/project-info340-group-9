import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './Nav';
import { Home } from './Home';
import { PreviewsPage } from './PreviewsPage';
import { Article } from './Article';

function App() {
  return (
    <div>
      <header>
        <Nav />
      </header>
    
      <main className="container">
        <div className="">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path=":topic" element={<PreviewsPage topics={['commuters', 'new-students', 'greek-life']}/>}>
              <Route path=":topic/:subtopic" element={<Article />}/>
            </Route>
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
