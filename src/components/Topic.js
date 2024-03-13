import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import TEXT from "../articles/articlecontent.json";
import { cards } from './Home';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Config';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';

import { getDatabase, ref, onValue } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

export function Topic(props) {

    const urlParams = useParams();
    const validTopics = props.topics;

   if (!validTopics.includes(urlParams.topic)) {
        return <Navigate to="/" />
    }

    const topicInfo = cards.filter((topic) => {return (topic.link.endsWith(`${urlParams.topic}`))})[0];
    
    /* generates an array of preview cards for each subtopic article */
    let previews = TEXT.map((article) => {if (article.topic === urlParams.topic) {
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

    const [bookmarkExists, setBookmarkExists] = useState(false);
    const [bookmarkData, setBookmarkData] = useState({});
    let subtopic = props.content.subtopic;
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
            <section className="col col-12 col-sm-6 col-md-4">
                <div className="card m-3">
                    {showImg()}
                    <div className="card-body d-flex">
                        <div className="card-body-header p-2">
                            <h2 className="card-title">{title}</h2>
                            {!!subtopic && bookmarkButton}
                        </div>
                        <div className="card-text p-2" dangerouslySetInnerHTML={textPreview()}></div>
                        <Link id="read-more" className="btn mt-auto p-2" to={props.link}>More <span className="fa fa-arrow-right"></span></Link>
                    </div>
                </div>
            </section>
        )}

