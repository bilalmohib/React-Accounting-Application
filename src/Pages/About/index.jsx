import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import NavHheader from "../../Components/NavHeader";
//Setting the use history hook
import { useLocation, useHistory } from 'react-router-dom';


const About = () => {
    const history = useHistory();

    return (
        <>
            <Header />
            <NavHheader />
            <hr />
            <h1 className="text-danger container">About Us</h1>
            <hr />
            <div className="container mt-4 border">
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio excepturi modi doloremque, doloribus voluptates eveniet praesentium temporibus saepe maiores possimus eos deserunt repellat vel sequi magnam nihil quis ea exercitationem.
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
export default About;
