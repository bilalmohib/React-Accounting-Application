import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import "./style.scss";

const NavHeader = (props) => {
    const history = useHistory();

    const MoveTo = (path) => {
        // alert(path)
        history.push(`${path}`)
    }
    return (
        <>
            {/* As a heading */}
            <nav className={`NavHeader1`}>
                <div className="navTextDiv container-fluid">
                    <span onClick={() => MoveTo(`/`)} className="navheader-text mb-0">Welcome to T Account</span>
                </div>
            </nav>
        </>
    )
}
export default NavHeader;