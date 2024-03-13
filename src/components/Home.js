import React from "react";
import { Preview } from "./Topic"

export const cards = [
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
]


export function Home() {

    let topicPreviews =cards.map((card) => {
        return <Preview link={card.link} content={card} img={card.img} />
    })
    
    return (
        <section>
          <header>
            <h1>Welcome to UW Wiki!</h1>
            <p>This is your student-authored survival guide to UW Seattle - <em>by students and for students.</em></p>
          </header>
          <main>
            <div className="previews d-flex justify-content-between flex-wrap align-content">
            {topicPreviews}
            </div>
          </main>
        </section>
    )
}