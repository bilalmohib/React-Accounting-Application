import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";
//Importing i18n
import i18n from "../i18n";
//Importing useTranslation and Trans from react-i18next
import { useTranslation, Trans } from 'react-i18next';

import Home from '../Pages/Home';
import About from "../Pages/About";

import { useLocation, useHistory } from 'react-router-dom';

function AppRouter() {
    const [change, setChange] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
        // if (change) {
        //     if (window.location.pathname === `/de/${t('description.url')}`) {
        //         i18n.changeLanguage("de");
        //         //                alert("de")
        //         setChange(false);
        //     }
        //     else if (window.location.pathname === `/en/${t('description.url')}`) {
        //         i18n.changeLanguage(`en`);
        //         //                alert("en");
        //         setChange(false);
        //     }
        //     else if (window.location.pathname === `/chi/${t('description.url')}`) {
        //         i18n.changeLanguage("chi");
        //         //                alert("chi")
        //         setChange(false);
        //     }
        //     else if (window.location.pathname === `/ar/${t('description.url')}`) {
        //         i18n.changeLanguage("ar");
        //         //                alert("ar")
        //         setChange(false);
        //     }
        //     else if (window.location.pathname === `/about`) {
        //         i18n.changeLanguage("en");
        //         //                alert("ar")
        //         setChange(false);
        //     }
        // }
    })

    return (
        <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/en" component={Home} />
            <Route exact path="/de" component={Home} />
            <Route exact path="/chi" component={Home} />
            <Route exact path="/ar" component={Home} />
            {/* `/translations/en/${t('description.url')}/website.json` */}
            <Route exact path={`/en/${t('description.url')}`} component={About} />
            <Route exact path={`/de/${t('description.url')}`} component={About} />
            <Route exact path={`/chi/${t('description.url')}`} component={About} />
            <Route exact path={`/ar/${t('description.url')}`} component={About} />
            <Route exact path={`/about`} component={About} />
        </Router>
    )
}
export default AppRouter;