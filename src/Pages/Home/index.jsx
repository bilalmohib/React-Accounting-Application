import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import NavHheader from "../../Components/NavHeader";
//Setting the use history hook
import { useLocation, useHistory } from 'react-router-dom';

//Importing Firebase 
import firebase from "../../firebase";
import 'firebase/firestore';
import 'firebase/auth';

const Home = () => {
    const [availableOptions, setAvailableOptions] = useState([]);
    const [currentOption, setCurrentOption] = useState("");
    const [option, setOption] = useState("");

    const history = useHistory();
    // const location = useLocation();
    // const { pathname } = location;
    useEffect(() => {

        //////////////////////////////////////////////////////////////////////////////////////////Retreiving firebase data from web
        // Now retreiving the data
        //////////////////////////////Here all data retreiving is working////////////////////////////
        // const db = firebase.firestore();
        // //Data Retreiving for Auth
        // db.collection(`Languages`)
        //     .get()
        //     .then(snapshot => {
        //         let data = [];
        //         snapshot.forEach(element => {
        //             data.push(Object.assign({
        //                 "id": element.id,
        //                 "translation": element.translation
        //             }, element.data()))
        //         })

        //         const language_array = [];

        //         for (let i = 0; i < data.length; i++) {
        //             //console.log(data[i].translation.description.short_name);
        //             let language_label = data[i].translation.description.short_name;
        //             language_array.push(language_label);
        //         }
        //         console.log(language_array);
        //         console.log(`data for current selected user `, convertArrayToObject(data, 1));
        //     })
        //////////////////////////////////////////////////////////////////////////////////////////Retreiving firebase data from web
    })

    const pushAvailableOptions = () => {
        //alert('hello');
        if (option != "") {
            setAvailableOptions([...availableOptions, option]);
            setOption("");
        }
        else {
            alert("Please enter any text to submit!");
        }
    }

    return (
        <>
            <Header />
            <NavHheader />
            <hr />
            <h1 className="text-success container">Home</h1>
            <hr />
            <div className="container mt-4 border">
                <h1>This is React JS site</h1>
                {/* The Drop down for selecting the option  */}

                <input value={option} onChange={(e) => setOption(e.target.value)} type="text" />
                <br />
                <br />
                <button onClick={() => pushAvailableOptions()}>Push</button>
                <br />
                <br />
                <h6>Current Stage :<span className="text-danger">*</span></h6>
                <br />
                <div className="input-group input-group-md category_select">
                    <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                    <select style={{ fontSize: "15px", width: "200px" }} value={currentOption}
                        onChange={(e) => setCurrentOption(e.target.value)} className="form-control">
                        {["--default--", ...availableOptions].map((v, i) => {
                            return <option value={v} key={i}>
                                {v}
                            </option>
                        })}
                    </select>
                </div>
                <br />
                {/* The Drop down for selecting the option */}
            </div>
            <br />
        </>
    )
}
export default Home;
