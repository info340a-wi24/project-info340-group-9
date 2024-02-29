import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export function Nav() {

    const [ menuClicked, setMenuClicked ] = useState(false)

    function handleClick() {
        if (!menuClicked) {
        setMenuClicked(true);
        } else {
            setMenuClicked(false);
        }}
    
    function menuOff() {
        setMenuClicked(false)
    }

    return (
        <nav>
            <div className="nav-container">

                {/* bookmark component should be implemented here.
                The icon below is currently not interactive. 
                Bookmark will also require responsive css based on the nav-menu format. See below. */}
                <div id="bookmark">
                    <i className="fas fa-bookmark" aria-label="bookmarks"></i>
                </div>

                <div className="website-title">
                    <h1 className="title"><a href="index.html">UW Wiki</a></h1>
                </div>

                {/* interactive hamburger menu will display only on mobile
                but css still needs to be made responsive */}
                <div id="hamburger-menu" onClick={handleClick}><i className="fa fa-bars" aria-label="side-menu"></i></div>
                {menuClicked ? (
                    <div id="side-nav">
                        <ul className="nav-links list-unstyled">
                            <NavLink to="home" onClick={menuOff}>HOME</NavLink>
                            <NavLink to="commuters" onClick={menuOff}>COMMUTERS</NavLink>
                            <NavLink to="new-students" onClick={menuOff}>NEW STUDENTS</NavLink>
                            <NavLink to="greek-life" onClick={menuOff}>GREEK LIFE</NavLink>
                        </ul>
                    </div>
                ) : (null)}

                {/* Nav links will be arranged as a bar for larger screen.
                Currently does not display because css is not responsive yet*/}
                <div className="nav-links">
                    <ul>
                        <NavLink to="home">HOME</NavLink>
                        <NavLink to="commuters">COMMUTERS</NavLink>
                        <NavLink to="new-students">NEW STUDENTS</NavLink>
                        <NavLink to="greek-life">GREEK LIFE</NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    )
}