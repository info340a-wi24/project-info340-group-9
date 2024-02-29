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
        return <Navigate to="../home" />
    }
    
    /* generates an array of preview cards for each subtopic article */
    let previews = TEXT.map((article) => {if (article.topic == urlParams.topic) {
        return <Preview content={article} />
    }})

    return (
        <>
            <h1>
                {pageHeading}
            </h1>
            <p>short description of the page's purpose?</p>
            <div>
                {previews}
            </div>
        </>
    )
}

function Preview(props) {

    const title = props.content.title;

    /* accesses a small snippet of the text */
    const text = props.content.text.slice(0, 80) + "..."

    /* helps render the text as html (so you can use html notation in the TEXT data file) */
    const textPreview = () => {return {__html: text}};

    return (
            /* needs some more utility classes to make the cards responsive */
            <div className="col-xs-12">
                <div className="card mb-4">
                    <img className="card-img-top" src="" alt="" />
                    <div className="card-body">
                        <h3 className="card-title">{title}</h3>
                        <p className="card-text" dangerouslySetInnerHTML={textPreview()}></p>
                        {/* 'to' property should be the subtopic URI after we implement the article component */}
                        <Link className="btn btn-dark" to="home">More</Link>
                    </div>
                </div>
            </div>
        )}

