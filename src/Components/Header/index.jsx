import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Header = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand navbar-text" to='/'>Home</Link>
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars" />
                    </button>
                    {/* <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/about`} tabIndex={-1} aria-disabled="true">About</Link>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </nav>
        </>
    )
}
export default Header;