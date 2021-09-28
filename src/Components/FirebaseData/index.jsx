import React, { useEffect, useState } from "react";
import i18n from "../../i18n";
//Importing useTranslation and Trans from react-i18next
import { useTranslation, Trans } from 'react-i18next';
//Setting the use history hook
import { useLocation, useHistory } from 'react-router-dom';

//Importing Firebase 
import firebase from "../../firebase";
import 'firebase/firestore';
import { query, orderBy } from "firebase/firestore";
import 'firebase/auth';


const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' },
    chi: { nativeName: 'Chinese' },
    ar: { nativeName: 'Arabic' }
};

const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item.translation.description.short_name]: item,
        };
    }, initialValue);
};

const FirebaseData = () => {
    const db = firebase.firestore();
    var actual;
    //Data Retreiving for Auth
    var aaa={};
    db.collection(`Languages`)
        .get()
        .then(snapshot => {
            let data = [];
            snapshot.forEach(element => {
                data.push(Object.assign({
                    "id": element.id,
                    "translation": element.translation
                }, element.data()))
            })

            const language_array = [];

            for (let i = 0; i < data.length; i++) {
                //console.log(data[i].translation.description.short_name);
                let language_label = data[i].translation.description.short_name;
                language_array.push(language_label);
            }
            console.log(language_array);
            //                console.log(`data for current selected user `, convertArrayToObject(data, 1));
            //setData(convertArrayToObject(data, 1));
            actual = convertArrayToObject(data, 1);
            console.log("Actual is equal to : ", actual);
            aaa = getData(actual);
        })
    //////////////////////////////////////////////////////////////////////////////////////////Retreiving firebase data from web
    return aaa;
}

FirebaseData();

const getData = (data) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA BBBBBBBBBBBBBBBBBBB CCCCCCCCCCCC",data)
    return data;
}

export {
    FirebaseData,
    getData
}

