import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//Importing Firebase 
/////////////////////////////////////
// import firebase from 'firebase';
// import 'firebase/firestore';
// import { query, orderBy } from "firebase/firestore";
// import 'firebase/auth';
//import { FirebaseData,getData } from './Components/FirebaseData';
//////////////////////////////////////
import LanguageDetector from 'i18next-browser-languagedetector';
//Importing Languages
import English from './LanguageJsonFiles/en';
import Germany from './LanguageJsonFiles/de';
import Chinese from './LanguageJsonFiles/chi';
import Arabic from './LanguageJsonFiles/ar';

const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item.translation.description.short_name]: item,
        };
    }, initialValue);
};

// const fun = () => {
//     var arr = {};

//     //Resources Object
//     const Resources = {
//         en: English,
//         de: Germany,
//         chi: Chinese,
//         ar: Arabic
//     }

//     //////////////////////////////////////////////////////////////////////////////////////////Retreiving firebase data from web
//     // Now retreiving the data
//     //////////////////////////////Here all data retreiving is working////////////////////////////
//     // const db = firebase.firestore();
//     // //Data Retreiving for Auth
//     // db.collection(`Languages`)
//     //     .get()
//     //     .then(snapshot => {
//     //         let data = [];
//     //         snapshot.forEach(element => {
//     //             data.push(Object.assign({
//     //                 "id": element.id,
//     //                 "translation": element.translation
//     //             }, element.data()))
//     //         })

//     //         const language_array = [];

//     //         for (let i = 0; i < data.length; i++) {
//     //             //console.log(data[i].translation.description.short_name);
//     //             let language_label = data[i].translation.description.short_name;
//     //             language_array.push(language_label);
//     //         }
//     //         console.log(language_array);

//     //         arr = convertArrayToObject(data, 1);
//     //     })

//     //console.log(`data for current selected user `,FirebaseData());
//     //////////////////////////////////////////////////////////////////////////////////////////Retreiving firebase data from web
//     //Resources Object
//     return Resources;
// }

let data = {
    en: English,
    de: Germany,
    chi: Chinese,
    ar: Arabic
};

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: data
    });

export default i18n;