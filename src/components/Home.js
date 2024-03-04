import React from "react";
import { Link } from "react-router-dom";

let cards = [
    {
        title: "Commuters",
        text: "Looking for parking? Or a place to nap/hangout?",
        img: "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/commuters",
      },
      {
        title: "New Students",
        text: "Want to get involved in campus life but not sure where to start?",
        img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/new-students",
      },
      {
        title: "Greek Life",
        text: "Interested in joining a sorority or fraternity?",
        img: "https://images.unsplash.com/photo-1561738787-ea2725d2b42a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/greek-life",
      },
]
export function Home() {

    /* Should show a welcome message and then previews of different topics
    The previews should look similar to the preview cards generated under Topic.js  */
    return (
        <div>
            <h1>Welcome to UW Wiki!</h1>
            <p>A UW-Seattle survival guide</p>
            <div className='container'>
                <div className='row'>
                    {cards.map((card, index)=> (
                        <div key={index} className="col col-sm-12 col-md-4">
                            <div className="card h-100">
                                <img className="card-img-top" src={card.img} alt={card.title} />
                                <div className="card-body">
                                    <h2 className="card-title">{card.title}</h2>
                                    <p className="card-text">{card.text}</p>
                                    <Link to={card.link} className="btn btn-primary">Read more</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}