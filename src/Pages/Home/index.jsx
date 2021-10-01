import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import NavHheader from "../../Components/NavHeader";
//Setting the use history hook
import { useLocation, useHistory } from 'react-router-dom';

//Importing Firebase 
import firebase from "../../firebase";
import 'firebase/firestore';
import 'firebase/auth';

import "./style.scss";

const Home = () => {
    const [availableOptions, setAvailableOptions] = useState(['Cash - Operating Account',
        'Cash - Payroll Account',
        'Cash - Money Market Account',
        'Cash - User Defined1',
        'Cash - User Defined2',
        'Cash - User Defined3',
        'Cash - Petty Cash']);
    const [currentOption, setCurrentOption] = useState("");
    const [option, setOption] = useState("");

    //The debit state
    const [debit,setDebit] = useState(0);
    const [credit,setCredit] = useState(0);

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
        //Either I have to insert the new element or not.I will check if already a option present it cant be inserted again.
        let insert = true;
        for (let i = 0; i < availableOptions.length; i++) {
            if (option == availableOptions[i]) {
                insert = false;
                break;
            }
        }
        if (!insert) {
            alert(`Please insert a Unique Value. '${option}' is already present.`);
        }
        if (option != "" && insert == true) {
            setAvailableOptions([...availableOptions, option]);
            setOption("");
        }
        if (option == "") {
            alert("Please enter any text to submit!");
        }
    }

    function arrayRemove(arr, value) {
        return arr.filter(function (ele) {
            return ele != value;
        });
    }

    const deleteItem = (key) => {
        // alert(key);
        let arr = availableOptions;
        //arr.splice(key, 1);
        let value = arr[key];
        //setAvailableOptions([]);
        //const new_arr = arr;
        var result = arrayRemove(arr, value);
        console.log("Available Options is : ", result);
        setAvailableOptions(result);
        // if (window.confirm(`Are you sure you want to delete the element ${availableOptions[key]} at number ${key + 1}`)) {
        //     condition = true;
        //     console.log("Available Options is : ", arr);
        // } else {
        //     console.log("User canceled deletion!");
        // }
    }

    return (
        <>
            <Header />
            <NavHheader />
            <hr />
            <div className="container-own">
                <div className="row">
                    <div className="col-3">
                        {/* Tab navs */}
                        <div className="nav flex-column nav-tabs text-center" id="v-tabs-tab" role="tablist" aria-orientation="vertical">
                            <a className="nav-link active" id="v-tabs-home-tab" data-mdb-toggle="tab" href="#v-tabs-home" role="tab" aria-controls="v-tabs-home" aria-selected="true">Add Values</a>
                            <a className="nav-link" id="v-tabs-profile-tab" data-mdb-toggle="tab" href="#v-tabs-profile" role="tab" aria-controls="v-tabs-profile" aria-selected="false">Caclulate</a>
                        </div>
                        {/* Tab navs */}
                    </div>
                    <div className="col-9 border">
                        {/* Tab content */}
                        <div className="tab-content" id="v-tabs-tabContent">
                            <div className="tab-pane fade show active" id="v-tabs-home" role="tabpanel" aria-labelledby="v-tabs-home-tab">
                                <h3 className="text-warning mt-3 mb-3">Enter the Value for the drop down : -</h3>
                                {/* The Drop down for selecting the option  */}
                                <input placeholder="Enter any text eg: 'A value' " className="form-control txt-field" value={option} onChange={(e) => setOption(e.target.value)} type="text" />
                                <br />
                                <button className="btn btn-primary btn-lg btn-push" onClick={() => pushAvailableOptions()}>Push</button>
                                <br />
                                <br />

                                {(availableOptions == "") ? (
                                    <h4 className="text-danger mb-4">Currently there are no values in drop down.Enter any value to be appeared in dropdown.</h4>
                                ) : (
                                    <div className="table-responsive container">
                                        <table className="table table-bordered">
                                            {
                                                availableOptions.map((v, i) => {
                                                    return <tbody key={i}>
                                                        {(i == 0) ? (
                                                            <tr>
                                                                <th>
                                                                    <h3>#</h3>
                                                                </th>
                                                                <th>
                                                                    <h4 className="text-success">DropDown Values</h4>
                                                                </th>
                                                                <th>
                                                                    <h4 className="text-warning">EDIT</h4>
                                                                </th>
                                                                <th>
                                                                    <h4 className="text-danger">
                                                                        Delete
                                                                    </h4>
                                                                </th>
                                                            </tr>
                                                        ) : (
                                                            <></>
                                                        )}

                                                        <tr>
                                                            <td>
                                                                <h4>{i + 1})</h4>
                                                            </td>
                                                            <td><h3>{v}</h3></td>
                                                            <td>
                                                                <button className="btn btn-warning">Edit</button>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => deleteItem(i)} className="btn btn-danger">Delete</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                })
                                            }
                                        </table>
                                    </div>
                                )}

                                {/* The Drop down for selecting the option */}
                            </div>
                            <div className="tab-pane fade" id="v-tabs-profile" role="tabpanel" aria-labelledby="v-tabs-profile-tab">
                                <br />
                                <h4 className="text-dark text-head">Select the account name from the drop down list located below
                                    <p className="text-danger text-bold text-center mt-4"> <b>OR</b></p> Input desired account names by navigating to the Add Values Tab located on the left side bar:
                                    {/* :  <span className="text-danger ml-4">*</span></h4> */}
                                </h4>
                                <div className="input-group input-group-md category_select txt-field">
                                    <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                    <select style={{ fontSize: "15px", width: "200px" }} value={currentOption}
                                        onChange={(e) => setCurrentOption(e.target.value)} className="form-control">
                                        {["No Selected Value", ...availableOptions].map((v, i) => {
                                            return <option value={v} key={i}>
                                                {v}
                                            </option>
                                        })}
                                    </select>
                                </div>
                                <hr />

                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h3 className="text-primary mt-3 mb-3">Debit Amount : -</h3>
                                            {/* The Drop down for selecting the option  */}
                                            <input type="number" placeholder="Enter any debit amount eg: '100' " className="form-control txt-field" value={debit} onChange={(e) => setDebit(e.target.value)} type="text" />
                                            <br />
                                            <button className="btn btn-primary btn-push" onClick={() => pushAvailableOptions()}>Push</button>
                                            <br />
                                            <br />
                                        </div>
                                        <div className="col-md-6">
                                            <h3 className="text-primary mt-3 mb-3">Credit Amount : -</h3>
                                            {/* The Drop down for selecting the option  */}
                                            <input type="number" placeholder="Enter any credit amount eg: '10' " className="form-control txt-field" value={credit} onChange={(e) => setCredit(e.target.value)} type="text" />
                                            <br />
                                            <button className="btn btn-primary btn-push" onClick={() => pushAvailableOptions()}>Push</button>
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Tab content */}
                    </div>
                </div>
            </div >
            <hr />
            <br />
        </>
    )
}
export default Home;
