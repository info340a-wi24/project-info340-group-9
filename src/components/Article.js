import React from "react";
import TEXT from "../articles/articlecontent.json";
import { useParams } from 'react-router-dom';

export function Article() {
    
    const subtopic = useParams().subtopic;
    let article = TEXT.filter(item => {return item.subtopic === subtopic})[0];
    if (!article) {
        return <div>Article not found.</div>;
    }

    const title = () => {return {__html: article.title}};
    const text = () => {return {__html: article.text}};
    return (
        <section>
            <header>
                <h1 dangerouslySetInnerHTML={title()}></h1>
            </header>
            <main>
                <div dangerouslySetInnerHTML={text()}></div>
            </main>
            <footer>
                <div className="feedback-form">
                <form id="feedback-form">
                    <div className="form-group">
                        <label htmlFor="feedback">Any feedback or suggestions?</label>
                        <textarea
                            id="feedback"
                            name="feedback"
                            placeholder="Any feedback or suggestions?"
                        ></textarea>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            </footer>
        </section>
    )
}
