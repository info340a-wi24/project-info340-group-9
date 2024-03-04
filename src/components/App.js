import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './Nav';
import { Home } from './Home';
import { Topic } from './Topic';
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

            {/* Needs code - Will welcome users and show previews of the topics */}
            <Route path="home" element={<Home />} />

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
