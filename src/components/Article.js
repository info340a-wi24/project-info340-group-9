import React from "react";
import TEXT from "../articles/articlecontent.json";
import { useParams } from 'react-router-dom';

export function Article() {
    /* should show title of article and content by accessing TEXT, which is an array of objects with each object representing article content.
    Check src/articles/articlecontent.json to see the format. 
    Should also implement feedback form at the end of the returned div. Feedback form might have to be implemented as separate component */

    let {subtopic} = useParams();
    let article = TEXT.find(item => item.subtopic === subtopic);
    if (!article) {
        return <div>Article not found.</div>;
    }
    return (
        <div>
            <h2>{article.title}</h2>
            <p>{article.text}</p>

            <div className="feedback-form">
                <form id="feedback-form">
                    <textarea
                        name="feedback"
                        placeholder="Any feedback or suggestions?"
                    ></textarea>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}
