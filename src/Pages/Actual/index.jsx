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

let AccountsData = [
    {
        name: 'Cash - Operating Account',
        totalDebit: 0,
        totalCredit: 0,
        actualCredit: 0,
        actualDebit: 0
    },
    {
        name: 'Cash - Payroll Account',
        totalDebit: 0,
        totalCredit: 0,
        actualCredit: 0,
        actualDebit: 0
    },
    {
        name: 'Cash - Money Market Account',
        totalDebit: 0,
        totalCredit: 0,
        actualCredit: 0,
        actualDebit: 0
    },
    {
        name: 'Cash - User Defined1',
        totalDebit: 0,
        totalCredit: 0,
        actualCredit: 0,
        actualDebit: 0
    },
    {
        name: 'Cash - User Defined2',
        totalDebit: 0,
        totalCredit: 0,
        actualCredit: 0,
        actualDebit: 0
    },
    {
        name: 'Cash - User Defined3',
        totalDebit: 0,
        totalCredit: 0,
        actualCredit: 0,
        actualDebit: 0
    },
    {
        name: 'Cash - Petty Cash',
        totalDebit: 0,
        totalCredit: 0,
        actualCredit: 0,
        actualDebit: 0
    }
]

const Actual = () => {
    const [availableOptions, setAvailableOptions] = useState(AccountsData);

    //Total Amount of Debit and credit that will be the sum of debit and credit amount of all the accounts
    const [totalCredit, setTotalCredit] = useState(0);

    const [alertManual, setAlertManual] = useState(true);

    const [totalDebit, setTotalDebit] = useState(0);

    const [labels, setLabels] = useState([]);

    const [currentLabel, setCurrentLabel] = useState("");

    const [currentOption, setCurrentOption] = useState("");

    const [currentIndex, setCurrentIndex] = useState(0);

    const [option, setOption] = useState("");

    //The debit state
    const [debit, setDebit] = useState(0);
    const [credit, setCredit] = useState(0);

    //Available Debits
    const [availableDebits, setAvailableDebits] = useState([]);
    const [availableCredits, setAvailableCredits] = useState([]);

    //The data of the user when he is signed In
    const [signedInUserData, setSignedInUserData] = useState({});
    const [status, setStatus] = useState(false);

    //For sending of data i.e states for database usage
    const [firestoreData,setFirestoreData] = useState([]);
    const [initial,setInitial] = useState(false);
    const [loading,setLoading] = useState(true);

    const history = useHistory();
    // const location = useLocation();
    // const { pathname } = location;
    useEffect(() => {
        const label = ["A", "B", "C", "D", "E", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        setLabels(label);
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

    }, [])

    useEffect(() => {
        let total_debits = 0;
        let total_credits = 0;
        for (let i = 0; i < availableOptions.length; i++) {
            total_credits = total_credits + availableOptions[i].actualCredit;
            total_debits = total_debits + availableOptions[i].actualDebit;
        }
        // console.log("Total Amount of Debit is : ", total_debits);
        // console.log("Total Amount of Credit is : ", total_credits);
        if (alertManual) {
            setTotalCredit(total_credits);
            setTotalDebit(total_debits);
            setAlertManual(false);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setStatus(true);
                console.log("The signed in User data is equal to :---- ", signedInUserData);
                setSignedInUserData(user);
                // console.log("...........",user.uid)
                // loadData();
            }
            else {
                setStatus(false);
                setSignedInUserData(null);
            }
        })
        
        if (status) {
            //SendNotifications();
            const db = firebase.firestore();
            db.collection(`Data/Projects/${signedInUserData.email}`)
                .get()
                .then(snapshot => {
                    let data = [];
                    snapshot.forEach(element => {
                        data.push(Object.assign({
                            id: element.id,
                            "ProjectName": element.ProjectName,
                            "ProjectMembers": element.ProjectMembers,
                            "ProjectStages": element.ProjectStages,
                            "ProjectTasks": element.ProjectTasks,
                            "createAt": element.createAt,
                        }, element.data()))
                    })
                    console.log("data=> ", data)
                    ///////////////////////////////Here is the code for sending notifications
                    ///////////////////////////////Here is the code for sending notifications
                    if (initial == true) {
                        let dateArray = [];
                        for (let i = 0; i < data.length; i++) {
                            var date = new Date(data[i].ProjectEndingDate);
                            var currentDate = new Date();
                            var difference_in_seconds = date - currentDate;
                            var Difference_In_Days = difference_in_seconds / (1000 * 3600 * 24);
                            if (Difference_In_Days < 25) {
                                console.log(`The Project is less than ${Difference_In_Days} days and its name is ${data[i].ProjectName}`)
                                ////////////////////////////
                                let today = new Date();
                                let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                let dateTime = date + ' ' + time;
                                dateTime = dateTime.toString();
                                ////////////////////////////
                                let thingsRef = db.collection(`Data/Notifications/${signedInUserData.email}`);
                                thingsRef.add({
                                    uid: signedInUserData.uid,
                                    userEmail: signedInUserData.email,
                                    ProjectName: data[i].ProjectName,
                                    ProjectMembers: data[i].ProjectMembers,
                                    ProjectStartingDate: data[i].ProjectStartingDate,
                                    ProjectEndingDate: data[i].ProjectEndingDate,
                                    CurrentStage: data[i].CurrentStage,
                                    CurrentStageCurrentTask: data[i].CurrentStageCurrentTask,
                                    createAt: data[i].createAt,
                                    notificationSentAt: dateTime,
                                    DaysLeft: Difference_In_Days
                                }).then(() => {
                                    //alert(`The '${Difference_In_Days}' Days are remaining of Project whose name is '${data[i].ProjectName}'`);
                                })
                            }
                            let temp = {
                                "ProjectEndingDate": Difference_In_Days + " days",
                                "ProjectName": data[i].ProjectName
                            }
                            //console.log(data[i].ProjectEndingDate+'\n');
                            dateArray.push(temp);
                        }
                    }

                    ///////////////////////////////Here is the code for sending notifications
                    ///////////////////////////////Here is the code for sending notifications

                    if (firestoreData.length != data.length) {
                        setFirestoreData(data);
                        setLoading(true);
                        setInitial(false)
                        console.log("Updated")
                    }
                }).catch(err => {
                    console.log(err)
                })
        }

    })

    //For adding default authenticated users
    const addDropdownData = () => {
        // const ref = db.collection(`Data`).doc();
        // const id = ref.id;

        // if (currentSelectedUser == "No User Selected!") {
        //   alert(PagesInfo.length.toString())
        //   alert("Please select a user to send the data");
        //   return;
        // }
        // else {
        //alert(`Now sending the data for user: ${currentSelectedUser}`);

        const db = firebase.firestore();
        let thingsRef = db.collection(`DropDownData/Accounts/${signedInUserData.email}`);

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        dateTime = dateTime.toString();

        // thingsRef.add(availableOptions).then(() => {
        //     console.log(`Data sent`);
        // })

        for (let i = 0; i < availableOptions.length; i++) {
            thingsRef.add(availableOptions[i]).then(() => {
                console.log(`Data sent for ${availableOptions[i]}  ${i} available option`);
            })
        }
    }
    //For adding default authenticated users

    const pushAvailableOptions = () => {
        //Either I have to insert the new element or not.I will check if already a option present it cant be inserted again.
        let insert = true;
        for (let i = 0; i < availableOptions.length; i++) {
            if (option == availableOptions[i].name) {
                insert = false;
                break;
            }
        }
        if (!insert) {
            alert(`Please insert a Unique Value. '${option}' is already present.`);
        }
        if (option != "" && insert == true) {
            let obj = {
                name: option,
                totalDebit: 0,
                totalCredit: 0,
                actualCredit: 0,
                actualDebit: 0
            }
            setAvailableOptions([...availableOptions, obj]);

            //So sending the available option data to the database
            const db = firebase.firestore();
            let thingsRef = db.collection(`DropDownData/Accounts/${signedInUserData.email}`);

            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date + ' ' + time;
            dateTime = dateTime.toString();

            thingsRef.add(obj).then(() => {
                console.log(`Data sent for ${option} current available option`);
            })

            // thingsRef.add(availableOptions).then(() => {
            //     console.log(`Data sent`);
            // })

            //So sending the available option data to the database

            // for (let i = 0; i < availableOptions.length; i++) {
            //     thingsRef.add(availableOptions[i]).then(() => {
            //         console.log(`Data sent for ${availableOptions[i]}  ${i} available option`);
            //     })
            // }
            setOption("");
            setAlertManual(true);
        }
        if (option == "") {
            alert("Please enter any text to submit!");
        }
    }

    const pushAvailableDebits = () => {
        if (debit != 0 && currentOption != "") {
            let obj = {
                selectedOption: currentOption,
                Debit: debit,
                Label: currentLabel
            }

            let arr = availableOptions;

            ///////////Wait I will test it later///////////
            // let index_current_account = 0;
            // for (let i = 0; i < arr.length; i++) {
            //     if (arr.name == currentOption) {
            //         ++index_current_account;
            //         console.log(`The current index of choosen account is ${i}`);
            //     }
            // }
            // if (index_current_account == 1) {
            //    arr[currentIndex].totalDebit = debit;
            // }
            ///////////Wait I will test it later///////////

            let creditTotal = 0;
            let debitTotal = 0;

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name == currentOption) {
                    creditTotal = creditTotal + arr[i].totalCredit;
                    debitTotal = debitTotal + arr[i].totalDebit;
                    console.log(`The total debit value pushed at index ${i} of account named ${arr[i].totalDebit}`, arr[i].totalDebit);
                }
            }

            debitTotal = parseInt(debitTotal) + parseInt(debit);
            //In case both are equal
            if (debitTotal == creditTotal) {
                console.log("Equal What should i do now");
            }
            if (debitTotal > creditTotal) {
                arr[currentIndex].actualDebit = debitTotal - creditTotal;
            }
            else {
                arr[currentIndex].actualCredit = creditTotal - debitTotal;
            }

            console.log(`The total Debits at position ${currentIndex} and value is : `, arr[currentIndex].totalDebit);

            //Changing The total 
            arr[currentIndex].totalDebit = parseInt(debitTotal);
            //Setting the Update Option Value
            setAvailableOptions(arr);

            console.log("Hi! Debit total is equal to : ", debitTotal);
            console.log("Hi! Credit total is equal to : ", creditTotal);

            setAvailableDebits([...availableDebits, obj]);
            setDebit(0);
            setAlertManual(true);
        }
        if (debit == 0) {
            alert("Please enter any debit value to submit!");
            return;
        }
        if (currentOption == "") {
            alert("Please select an option also from the above drop down to submit debit value.")
            return;
        }
        if (currentLabel == "") {
            alert("Please select a Label from the Menu to Submit the value.")
            return;
        }
    }

    const changingSelectedOption = (value) => {
        var index;
        for (let i = 0; i < availableOptions.length; i++) {
            if (availableOptions[i].name === value) {
                index = i;
            }
        }

        setCurrentIndex(index);

        console.log("The selected value index is : " + index);

        setCurrentOption(value);
    }

    const pushAvailableCredits = () => {
        if (credit != 0 && currentOption != "") {
            let obj = {
                selectedOption: currentOption,
                Credit: credit,
                Label: currentLabel
            }

            let arr = availableOptions;

            let creditTotal = 0;
            let debitTotal = 0;

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name == currentOption) {
                    creditTotal = creditTotal + arr[i].totalCredit;
                    debitTotal = debitTotal + arr[i].totalDebit;
                    console.log(i);
                }
            }

            console.log(`The total Credits at position ${currentIndex} and value is : `, arr[currentIndex].totalCredit);

            creditTotal = parseInt(creditTotal) + parseInt(credit);
            //In case both are equal
            // if(debitTotal == creditTotal)
            // {
            //     console.log("Equal What should i do now");
            // }
            if (debitTotal > creditTotal) {
                arr[currentIndex].actualDebit = debitTotal - creditTotal;
            }
            else {
                arr[currentIndex].actualCredit = creditTotal - debitTotal;
            }

            //Changing The total 
            arr[currentIndex].totalCredit = creditTotal;
            //Setting the Option
            setAvailableOptions(arr);
            setAvailableCredits([...availableCredits, obj]);
            setCredit(0);
            setAlertManual(true);
        }
        if (credit == 0) {
            alert("Please enter any Credit value to submit!");
            return;
        }
        if (currentOption == "") {
            alert("Please select an option also from the above drop down to submit Credit value.")
            return;
        }
        if (currentLabel == "") {
            alert("Please select a Label from the Menu to Submit the value.")
            return;
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
        setAlertManual(true);
        // if (window.confirm(`Are you sure you want to delete the element ${availableOptions[key]} at number ${key + 1}`)) {
        //     condition = true;
        //     console.log("Available Options is : ", arr);
        // } else {
        //     console.log("User canceled deletion!");
        // }
    }

    const changeSelectedOption = (e, key) => {
        console.log("VVVVVVVVVVVVVVV ", e, key);
        let aO = availableOptions;

    }

    return (
        <>
            <Header />
            <NavHheader />
            <br />
            <div className="container-own">
                <div className="row">
                    <div>
                        {/* Tabs navs */}
                        <ul className="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" id="ex3-tab-1" data-mdb-toggle="tab" href="#ex3-tabs-1" role="tab" aria-controls="ex3-tabs-1" aria-selected="true">Add Values</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="ex3-tab-2" data-mdb-toggle="tab" href="#ex3-tabs-2" role="tab" aria-controls="ex3-tabs-2" aria-selected="false">Calculate</a>
                            </li>
                        </ul>
                        {/* Tabs navs */}
                        {/* Tabs content */}
                        <div className="tab-content" id="ex2-content">
                            <div className="tab-pane fade show active container border" id="ex3-tabs-1" role="tabpanel" aria-labelledby="ex3-tab-1">
                                <h3 className="text-warning mt-3 mb-3">Enter the Value for the drop down : -</h3>
                                {/* The Drop down for selecting the option  */}
                                <input placeholder="Enter any text eg: 'A value' " className="form-control txt-field" value={option} onChange={(e) => setOption(e.target.value)} type="text" />
                                <br />
                                <button className="btn btn-primary btn-lg btn-push" onClick={() => pushAvailableOptions()}>Add</button>
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
                                                            <td><h3>{v.name}</h3></td>
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
                            <div className="tab-pane fade" id="ex3-tabs-2" role="tabpanel" aria-labelledby="ex3-tab-2">
                                <div className="container-own">
                                    <div className="row">
                                        <div className="container">
                                            <br />
                                            <h4 className="text-dark text-head">Select the account name from the drop down list located below
                                                <p className="text-danger text-bold text-center mt-4"> <b>OR</b></p> Input desired account names by navigating to the Add Values Tab located on the left side bar:
                                                {/* :  <span className="text-danger ml-4">*</span></h4> */}
                                            </h4>
                                            <div title="Select the account name from the drop down list located below" className="input-group input-group-md txt-field">
                                                <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                                <select style={{ fontSize: "18px", width: "200px", height: "40px" }} value={currentOption}
                                                    onChange={(e) => changingSelectedOption(e.target.value)} className="form-control">
                                                    {["No Selected Value", ...availableOptions].map((v, i) => {
                                                        return <option value={v.name} key={i}>
                                                            {v.name}
                                                        </option>
                                                    })}
                                                </select>
                                            </div>

                                            <br />

                                            <h4 className="text-primary text-bold">
                                                Select the label you want to insert with the value :
                                            </h4>

                                            <div className="input-group input-group-md txt-field">
                                                <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                                <select style={{ fontSize: "18px", width: "200px", color: "blue" }} value={currentLabel}
                                                    onChange={(e) => setCurrentLabel(e.target.value)} className="form-control">
                                                    {["No Selected Label", ...labels].map((v, i) => {
                                                        return <option value={v} key={i}>
                                                            {v}
                                                        </option>
                                                    })}
                                                </select>
                                            </div>

                                            <br />
                                            <br />

                                        </div>

                                        <hr />

                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h3 className="text-primary mt-3 mb-3">Debit Amount : -</h3>
                                                    {/* The Drop down for selecting the option  */}
                                                    <input type="number" placeholder="Enter any debit amount eg: '100' " className="form-control txt-field" value={debit} onChange={(e) => setDebit(e.target.value)} />
                                                    <br />
                                                    <button className="btn btn-primary btn-push" onClick={() => pushAvailableDebits()}>Add Debit Amount</button>
                                                    <br />
                                                    <br />
                                                </div>
                                                <div className="col-md-6">
                                                    <h3 className="text-primary mt-3 mb-3">Credit Amount : -</h3>
                                                    {/* The Drop down for selecting the option  */}
                                                    <input type="number" placeholder="Enter any credit amount eg: '10' " className="form-control txt-field" value={credit} onChange={(e) => setCredit(e.target.value)} />
                                                    <br />
                                                    <button className="btn btn-primary btn-push" onClick={() => pushAvailableCredits()}>Add Credit Amount</button>
                                                    <br />
                                                    <br />
                                                </div>
                                            </div>

                                            {/* <div className="row">
                                                <div className="col-md-12">
                                                    <button onClick={addDropdownData}>Add DropDown Values</button>
                                                </div>
                                            </div> */}
                                        </div>

                                        <br />

                                        <div className="outer_container_accounts">
                                            {availableOptions.map((v, i) => {
                                                return <div className="container container_Acconts_List" key={i}>
                                                    <div className=" w-fit-content">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="input-group input-group-md category_select txt-field">
                                                                    <span className="input-group-addon glyphicon glyphicon-search"></span>
                                                                    <h2 className="bg-heading-Account" id="Table-DropDown">
                                                                        {v.name}
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="table table table-bordered table-responsive">
                                                                    <table className="table table-hover">
                                                                        <thead>
                                                                            <tr>
                                                                                <th colSpan={3}>
                                                                                    <h5 className="text-bold text-center">Debit</h5>
                                                                                    {/* <h6><span className="text-success">The amount in Credit Card in different sections</span> </h6> */}
                                                                                </th>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="col"> <p className="text-center"> <b>Ref</b></p> </th>
                                                                                <th scope="col"> <p className="text-center"><b>Amounts</b></p></th>
                                                                                <th scope="col"> <p className="text-center text-danger"><b>Delete</b></p></th>
                                                                                {/* <th scope="col"> <p><b>Edit</b></p> </th> */}
                                                                            </tr>
                                                                        </thead>
                                                                        <>
                                                                            <tbody className="bg-gradient-upper-table">

                                                                                {(availableDebits.length == 0) ? (
                                                                                    <tr>
                                                                                        <th scope="row" className="text-center">Add Ref</th>
                                                                                        <th scope="row" className="text-center">Add Amount</th>
                                                                                        <th scope="row" className="text-center text-danger ml_Minus">Delete</th>
                                                                                        {/* <th scope="row"><button className="btn btn-warning btn-sm" disabled={true}>E</button></th> */}
                                                                                    </tr>
                                                                                ) : (
                                                                                    availableDebits.map((z, j) => {
                                                                                        return <tr key={j}>
                                                                                            {
                                                                                                (z.selectedOption == v.name) ? (
                                                                                                    <>
                                                                                                        <th scope="row" className="text-center w-fit-content text-bold mt-3"><h6 className="text-bold">{z.Label}</h6></th>
                                                                                                        <td>
                                                                                                            <h6 className="text-dark text-center text-bold">{z.Debit} </h6>
                                                                                                        </td>
                                                                                                        <td className="ml_Minus cursor_pointer" onClick={() => alert("Delete")}>
                                                                                                            <h6 className="text-dark text-center text-bold">
                                                                                                                <i className="fas fa-pen-square fa-1x text-danger"></i>
                                                                                                            </h6>
                                                                                                        </td>
                                                                                                       
                                                                                                        {/* <td className="text-center"><button type="button" className="btn btn-warning btn-sm">E</button></td> */}
                                                                                                    </>
                                                                                                ) : (
                                                                                                    <></>
                                                                                                )
                                                                                            }
                                                                                        </tr>
                                                                                    })
                                                                                )}
                                                                            </tbody>
                                                                            {/* This matters */}
                                                                        </>
                                                                    </table>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="table table-bordered table-responsive">
                                                                    <table className="table table-hover">
                                                                        <thead>
                                                                            <tr>
                                                                                <th colSpan={3}>
                                                                                    <h5 className="text-bold text-center">Credit</h5>
                                                                                    {/* <h6><span className="text-danger">The amount in Credit Card in different sections</span> </h6> */}
                                                                                </th>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="col"> <p className="text-center"> <b>Ref</b></p> </th>
                                                                                <th scope="col"> <p className="text-center"><b>Amounts</b></p></th>
                                                                                <th scope="col"> <p className="text-center text-danger"><b>Delete</b></p></th>
                                                                                {/* <th scope="col"> <p><b>Edit</b></p> </th> */}
                                                                            </tr>
                                                                        </thead>
                                                                        <>
                                                                            <tbody className="bg-gradient-upper-table">
                                                                                {(availableCredits.length == 0) ? (
                                                                                    <tr>
                                                                                        <th scope="row" className="text-center">Add Ref</th>
                                                                                        <th scope="row" className="text-center">Add Amount</th>
                                                                                        <th scope="row" className="text-center text-danger">Delete</th>
                                                                                        {/* <th scope="row"><button className="btn btn-warning btn-sm" disabled={true}>E</button></th> */}
                                                                                    </tr>
                                                                                ) : (
                                                                                    availableCredits.map((z, j) => {
                                                                                        return <tr key={j}>
                                                                                            {(z.selectedOption == v.name) ? (
                                                                                                <>
                                                                                                    <th scope="row" className="text-center text-bold mt-3"><h6 className="text-bold">{z.Label}</h6></th>
                                                                                                    <td>
                                                                                                        <h6 className="text-dark text-center text-bold">{z.Credit}</h6>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <h6 className="text-dark text-center text-bold">
                                                                                                            <i className="fas fa-trash fa-1x text-danger"></i>
                                                                                                        </h6>
                                                                                                    </td>
                                                                                                    {/* <td className="text-center"><button type="button" className="btn btn-warning btn-sm">E</button></td> */}
                                                                                                </>
                                                                                            ) : (
                                                                                                <></>
                                                                                            )}
                                                                                        </tr>
                                                                                    })
                                                                                )}
                                                                                {/* <tr>
                                                                                <td>
                                                                                    <h4>A</h4>
                                                                                </td>
                                                                                <td>
                                                                                    <h4>B</h4>
                                                                                </td>
                                                                            </tr> */}
                                                                            </tbody>
                                                                            {/* This matters */}
                                                                        </>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row" style={{ marginTop: "0px" }}>
                                                            <div className="col-md-12">
                                                                <hr />
                                                            </div>
                                                        </div>

                                                        <div className="h-normal">
                                                            <div className="row mb-4 text-center">
                                                                <div className="col-md-6">
                                                                    <h4><b>Total</b> = <b className="text-dark custom_margin_top">{v.totalDebit}</b></h4>
                                                                    {/* <h4>Total Amount of Cash in {v.name} :- <b className="text-dark mt-4">{v.totalDebit}.</b></h4> */}
                                                                </div>
                                                                <div className="col-md-6">
                                                                    {/* <h4>Total Amount of Cash in {v.name} :- <b className="text-dark mt-4">{v.totalCredit}.</b></h4> */}
                                                                    <h4><b>Total</b> = <b className="text-dark custom_margin_top">{v.totalCredit}</b></h4>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row" style={{ marginTop: "-12px" }}>
                                                            <div className="col-md-12">
                                                                <hr />
                                                            </div>
                                                        </div>

                                                        <div className="h-normal">
                                                            <div className="row mb-4 text-center">
                                                                <div className="col-md-6">
                                                                    {(v.actualDebit > v.actualCredit) ? (
                                                                        <h4><b>Debit</b> = <b className="text-dark custom_margin_top">{v.actualDebit}</b></h4>
                                                                        // <h4>Actual <b>Debit</b> in {v.name} :- <b className="text-success mt-4">{v.actualDebit}</b></h4>
                                                                    ) : (
                                                                        <h4><b>Debit</b> = <b className="text-dark custom_margin_top">0</b></h4>
                                                                        // <h4>Actual <b>Debit</b> in {v.name} :- <b className="text-success mt-4">0</b></h4>
                                                                    )}
                                                                </div>
                                                                <div className="col-md-6">
                                                                    {(v.actualCredit > v.actualDebit) ? (
                                                                        <h4><b>Credit</b> = <b className="text-dark custom_margin_top">{v.actualCredit}</b></h4>
                                                                        // <h4>Actual <b>Credit</b> in {v.name} :- <b className="text-danger mt-4">{v.actualCredit}</b></h4>
                                                                    ) : (
                                                                        <h4><b>Credit</b> = <b className="text-dark custom_margin_top">0</b></h4>
                                                                        // <h4>Actual <b>Credit</b> in {v.name} :- <b className="text-danger mt-4">0</b></h4>
                                                                    )}

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            })}
                                        </div>

                                    </div>
                                    <br />
                                    <hr />
                                    <br />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table table-responsive">
                                                <table className="table table-bordered">
                                                    <thead className="bg-dark">
                                                        <tr>
                                                            <th colSpan={3} style={{ backgroundColor: "#f2f3f9" }}>
                                                                <h3 className="text-bold text-center text-dark">&nbsp;&nbsp; GL Summary</h3>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th scope="col" style={{ backgroundColor: "#f2f3f9" }}> <h4 className="text-center text-label-head-table"> <b>Account</b></h4> </th>
                                                            <th scope="col" style={{ backgroundColor: "#f2f3f9" }}> <h4 className="text-center text-label-head-table"><b style={{ backgroundColor: "#f2f3f9" }}>Debit</b></h4></th>
                                                            <th scope="col" style={{ backgroundColor: "#f2f3f9" }}> <h4 className="text-center text-label-head-table"><b>Credit</b></h4></th>
                                                            {/* <th scope="col"> <p><b>Edit</b></p> </th> */}
                                                        </tr>
                                                    </thead>
                                                    <>
                                                        <tbody className="bg-gradient">
                                                            {(availableOptions.length == 0) ? (
                                                                <tr>
                                                                    <th scope="row" className="text-center">No Name</th>
                                                                    <th scope="row" className="text-center">No Debit Value</th>
                                                                    <th scope="row" className="text-center">No Credit Value</th>
                                                                    {/* <th scope="row"><button className="btn btn-warning btn-sm" disabled={true}>E</button></th> */}
                                                                </tr>
                                                            ) : (
                                                                availableOptions.map((v, i) => {
                                                                    return <tr key={i}>
                                                                        <th scope="row" className="text-left text-bold mt-3"><h5 className="text-bold"><b>{v.name}</b></h5></th>
                                                                        <td>
                                                                            {(v.actualCredit < v.actualDebit) ? (
                                                                                <h6 className="text-right mt-2 text-bold">{v.actualDebit}</h6>
                                                                            ) : (
                                                                                <h6 className="text-dark text-right mt-2 text-bold">0</h6>
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            {(v.actualCredit > v.actualDebit) ? (
                                                                                <h6 className="text-right mt-2 text-bold">{v.actualCredit}</h6>
                                                                            ) : (
                                                                                <h6 className="text-dark text-right mt-2 text-bold">0</h6>
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                })
                                                            )}
                                                            {(totalCredit != totalDebit) ? (
                                                                <tr>
                                                                    <td>
                                                                        <h2 className="text-danger"><b>Total</b></h2>
                                                                    </td>
                                                                    <td className="text-right">
                                                                        <h2 className="text-danger"><b>{totalDebit}</b></h2>
                                                                    </td>
                                                                    <td className="text-right">
                                                                        <h2 className="text-danger"><b>{totalCredit}</b></h2>
                                                                    </td>
                                                                </tr>
                                                            ) : (
                                                                <tr>
                                                                    <td>
                                                                        <h2>Total</h2>
                                                                    </td>
                                                                    <td className="text-right">
                                                                        <h2>{totalDebit}</h2>
                                                                    </td>
                                                                    <td className="text-right">
                                                                        <h2>{totalCredit}</h2>
                                                                    </td>
                                                                </tr>
                                                            )}

                                                        </tbody>
                                                        {/* This matters */}
                                                    </>
                                                </table>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* Tabs content */}
                    </div>
                </div>
            </div >
            <br />
            <br />
        </>
    )
}
export default Actual;
