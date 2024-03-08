import React, { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import TEXT from "../articles/articlecontent.json";

export function Topic(prop) {

    const urlParams = useParams();
    const topics = prop.topics;

    /* Still needs some editing but this formats the text for the heading on the topic page */
    const pageHeading = urlParams.topic[0].toUpperCase() + urlParams.topic.slice(1);

    /* if users have a mispelled URI it redirects them to the homepage */
    if (!topics.includes(urlParams.topic)) {
        return <Navigate to="/" />
    }
    
    /* generates an array of preview cards for each subtopic article */
    let previews = TEXT.map((article) => {if (article.topic == urlParams.topic) {
        return <Preview link={article.subtopic} content={article} />
    }})

    return (
        <>
            <h1>
                {pageHeading}
            </h1>
            <p>short description of the page's purpose?</p>
            <div className="preview">
                {previews}
            </div>
        </>
    )
}

export function Preview(props) {

    const title = props.content.title;
    let text = props.content.text;
    /* accesses a small snippet of the text */
    if (text.length > 100) {
        text = text.slice(0, 80) + "..."
    }
    
    function showBookmark() {
        if (props.content.subtopic) {
            return <button className="btn bookmark-btn"><i className="fas fa-bookmark" aria-label="bookmarks"></i></button>
        }
    }

    function showImg() {
        if (!props.content.subtopic) {
            return <img className="card-img-top" src={props.content.img} />
        }
    }

    /* helps render the text as html (so you can use html notation in the TEXT data file) */
    const textPreview = () => {return {__html: text}};

    return (
            /* needs some more utility classes to make the cards responsive */
            <div className="col col-sm-12 col-md-6">
                <div className="card m-3">
                    {showImg()}
                    <div className="card-body">
                        <div className="card-bookmark">
                            <h3 className="card-title">{title}</h3>
                            {showBookmark()}
                        </div>
                        <div className="card-text" dangerouslySetInnerHTML={textPreview()}></div>
                        {/* 'to' property should be the subtopic URI after we implement the article component */}
                        <Link className="btn btn-dark" to={props.link}>More</Link>
                    </div>
                </div>
            </div>
        )}

