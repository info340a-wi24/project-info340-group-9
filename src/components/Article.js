import React from "react";
import TEXT from "../articles/articlecontent.json";
import { useParams } from 'react-router-dom';

export function Article() {
    /* should show title of article and content by accessing TEXT, which is an array of objects with each object representing article content.
    Check src/articles/articlecontent.json to see the format. 
    Should also implement feedback form at the end of the returned div. Feedback form might have to be implemented as separate component */

    const subtopic = useParams().subtopic;
    let article = TEXT.filter(item => {return item.subtopic == subtopic})[0];
    if (!article) {
        return <div>Article not found.</div>;
    }

    const title = () => {return {__html: article.title}};
    const text = () => {return {__html: article.text}};
    return (
        <div>
            <h2 dangerouslySetInnerHTML={title()}></h2>
            <div dangerouslySetInnerHTML={text()}></div>

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
