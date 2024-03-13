import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import TEXT from "../articles/articlecontent.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cards } from './Home';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Config';
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

import { getDatabase, ref, onValue, push, runTransaction, update } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
const userDataRef = ref(db, 'userData');

/* const cards = [
    {
        title: "Commuters",
        link: "../commuters",
        text: "Looking for parking? Or a place to nap/hangout?",
        img: "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "New Students",
        link: "../new-students",
        text: "Want to get involved in campus life but not sure where to start?",
        img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Greek Life",
        link: "../greek-life",
        text: "Interested in joining a sorority or fraternity?",
        img: "https://images.unsplash.com/photo-1561738787-ea2725d2b42a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
] */

export function Topic(props) {

    const urlParams = useParams();
    const validTopics = props.topics;

    /* Still needs some editing but this formats the text for the heading on the topic page */
    /* if users have a mispelled URI it redirects them to the homepage */
    if (!validTopics.includes(urlParams.topic)) {
        return <Navigate to="/" />
    }

    const topicInfo = cards.filter((topic) => {return (topic.link.endsWith(`${urlParams.topic}`))})[0];
    
    /* generates an array of preview cards for each subtopic article */
    let previews = TEXT.map((article) => {if (article.topic == urlParams.topic) {
        return <Preview key={article.subtopic} link={`/${article.topic}/${article.subtopic}`} content={article} bookmarkCallback={props.callback} />
    }})

    return (
        <section>
            <header>
               <h1>
                    {topicInfo.title}
                </h1> 
                <p>{topicInfo.text}</p>
            </header>
            <main>
                <div className="previews d-flex justify-content-center flex-wrap align-content">
                    {previews}
                </div>
            </main>
        </section>
    )
}

export function Preview(props) {

    const [ bookmarkLink, setBookmarkLink ] = useState(false);
    const [bookmarkExists, setBookmarkExists] = useState(false);
    const [onHomepage, setOnHomepage] = useState(null);
    const [bookmarkData, setBookmarkData] = useState({});
    let subtopic = props.content.subtopic;
    /* let bookmarkRef = ref(db, `userData/${auth.currentUser.uid}/bookmarks/${props.content.subtopic}`) */
    console.log(bookmarkData);
    let bookmarkButton = <button className={`btn bookmark-btn ${Object.keys(bookmarkData).includes(subtopic) ? 'bookmarked' : 'not-bookmarked'}`} aria-label="Save bookmark" onClick={saveBookmark}>
    <span className="fas fa-bookmark" aria-label="bookmarks"></span>
</button>

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
              const bookmarksRef = ref(db, `userData/${firebaseUser.uid}/bookmarks`);
              onValue(bookmarksRef, (snapshot) => {
                const bookmarksData = snapshot.val();
                setBookmarkData(bookmarksData || {});
                }
              );
            } else {
        
            }
          });
          return () => unsubscribe();
        }, []);




    const title = props.content.title;
    let text = props.content.text;
    /* accesses a small snippet of the text */
    if (text.length > 100) {
        text = text.slice(0, 80) + "..."
    }
    


    function showImg() {
        if (!subtopic) {
            return <img className="card-img-top" src={props.content.img} alt=""/>
        }
    }


    function saveBookmark() {
        props.bookmarkCallback(props.content, props.link, bookmarkExists);
        setBookmarkExists(!bookmarkExists);
    }
    /* helps render the text as html (so you can use html notation in the TEXT data file) */
    const textPreview = () => {return {__html: text}};

    return (
            /* needs some more utility classes to make the cards responsive */
        
            <section className="col col-12 col-sm-6 col-md-4">
                <div className="card m-3">
                    {showImg()}
                    <div className="card-body d-flex">
                        <div className="card-body-header p-2">
                            <h2 className="card-title">{title}</h2>
                            {!!subtopic && bookmarkButton}
                        </div>
                        <div className="card-text p-2" dangerouslySetInnerHTML={textPreview()}></div>
                        {/* 'to' property should be the subtopic URI after we implement the article component */}
                        <Link id="read-more" className="btn mt-auto p-2" to={props.link}>More <span className="fa fa-arrow-right"></span></Link>
                    </div>
                </div>
            </section>
        )}

