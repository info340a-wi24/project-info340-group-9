import React from "react";
import TEXT from "../articles/articlecontent.json";

export function Article( {match} ) {
    /* should show title of article and content by accessing TEXT, which is an array of objects with each object representing article content.
    Check src/articles/articlecontent.json to see the format. 
    Should also implement feedback form at the end of the returned div. Feedback form might have to be implemented as separate component */

    /* info on react router's match: https://v5.reactrouter.com/web/api/match */ 

    let {subtopic} = match.params;
    let article = TEXT.find(item => item.subtopic === subtopic);
    return (
        <div>
            <h2>{article.title}</h2>
            <p>{article.text}</p>
        </div>
    )
}
/*test comment */