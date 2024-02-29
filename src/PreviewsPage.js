import React, { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import TEXT from "./articles/articlecontent.json";

export function PreviewsPage(prop) {

    const urlParams = useParams();
    const topics = prop.topics;
    const pageHeading = urlParams.topic[0].toUpperCase() + urlParams.topic.slice(1);

    if (!topics.includes(urlParams.topic)) {
        return <Navigate to="../home" />
    }
    
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
    const text = props.content.text.slice(0, 80) + "..."
    const textPreview = () => {return {__html: text}};

    return (
            <div className="col-xs-12">
                <div className="card mb-4">
                    <img className="card-img-top" src="" alt="" />
                    <div className="card-body">
                        <h3 className="card-title">{title}</h3>
                        <p className="card-text" dangerouslySetInnerHTML={textPreview()}></p>
                        <Link className="btn btn-dark" to="home">More</Link>
                    </div>
                </div>
            </div>
        )}

