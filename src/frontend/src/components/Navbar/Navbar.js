import React from 'react';
import navbarlogo from './NavbarLogo.svg';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-color">
            <img src={navbarlogo} alt="logo" />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link Tms-h6" href="#"> Task Management System <span className="sr-only">(current)</span></a>
                </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;