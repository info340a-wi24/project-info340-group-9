import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import TEXT from "../articles/articlecontent.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export function Topic(props) {

    const urlParams = useParams();
    const topics = props.topics;

    /* Still needs some editing but this formats the text for the heading on the topic page */
    const pageHeading = urlParams.topic[0].toUpperCase() + urlParams.topic.slice(1);

    /* if users have a mispelled URI it redirects them to the homepage */
    if (!topics.includes(urlParams.topic)) {
        return <Navigate to="/" />
    }
    
    /* generates an array of preview cards for each subtopic article */
    let previews = TEXT.map((article) => {if (article.topic == urlParams.topic) {
        return <Preview key={article.subtopic} link={`/${article.topic}/${article.subtopic}`} content={article} bookmarkCallback={props.callback} />
    }})

    return (
        <section>
            <header>
               <h1>
                    {pageHeading}
                </h1> 
                <p>short description of the page's purpose?</p>
            </header>
            <main>
                {previews}
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

    let bookmarkButton = <button className={`btn bookmark-btn ${bookmarkExists ? 'bookmarked' : 'not-bookmarked'}`} aria-label="Save bookmark" onClick={saveBookmark}>
    <span className="fas fa-bookmark" aria-label="bookmarks"></span>
</button>

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
              const bookmarksRef = ref(db, `userData/${firebaseUser.uid}/bookmarks`);
              onValue(bookmarksRef, (snapshot) => {
                  const bookmarksData = snapshot.val();
                  setBookmarkData(bookmarksData || {});
                  setBookmarkExists(Object.keys(bookmarksData).includes(subtopic));
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
            <section className="col col-sm-12 col-md-6">
                <div className="card m-3">
                    {showImg()}
                    <div className="card-body">
                        <div className="card-body-header">
                            <h2 className="card-title">{title}</h2>
                            {!!subtopic ? bookmarkButton : (null)}
                        </div>
                        <div className="card-text" dangerouslySetInnerHTML={textPreview()}></div>
                        {/* 'to' property should be the subtopic URI after we implement the article component */}
                        <Link id="read-more" className="btn" to={props.link}>More <span className="fa fa-arrow-right"></span></Link>
                    </div>
                </div>
            </section>
        )}

