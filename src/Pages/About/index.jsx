import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import NavHheader from "../../Components/NavHeader";
import i18n from "../../i18n";
//Importing useTranslation and Trans from react-i18next
import { useTranslation, Trans } from 'react-i18next';
//Setting the use history hook
import { useLocation, useHistory } from 'react-router-dom';

const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' },
    chi: { nativeName: 'Chinese' },
    ar: { nativeName: 'Arabic' }
};

const About = () => {
    const [currentLanguage, setCurrentLanguage] = useState("");
    const [change, setChange] = useState(true);

    const { t } = useTranslation();

    const history = useHistory();
    // const location = useLocation();
    // const { pathname } = location;

    const changeTheLanguage = (e) => {
        setCurrentLanguage(e);
        i18n.changeLanguage(e);
        if (e === 'de') {
            history.push(`/${e}/${t('description.url')}`);
        }
        else if (e === 'en') {
            history.push(`/${e}/${t('description.url')}`);
        }
        else if (e === 'chi') {
            history.push(`/${e}/${t('description.url')}`);
        }
        else if (e === 'ar') {
            history.push(`/${e}/${t('description.url')}`);
        }
        //alert("Changed");
    }

    useEffect(() => {
        if (change) {
            if (window.location.pathname === '/de/Über') {
                i18n.changeLanguage("de");
                // alert("de")
                setChange(false);
            }
            else if (window.location.pathname === '/en/about' || window.location.pathname === '/about') {
                i18n.changeLanguage("en");
                // alert("en")
                setChange(false);
            }
            else if (window.location.pathname === '/chi/关于') {
                i18n.changeLanguage("chi");
                // alert("chi")
                setChange(~false);
            }
            else if (window.location.pathname === '/ar/حول') {
                i18n.changeLanguage("ar");
                // alert("ar")
                setChange(false);
            }
        }
    })

    return (
        <>
            <Header />
            <NavHheader />
            <hr />
            <h1 className="text-danger container">{t('description.subAbout')}</h1>
            <hr />
            <div className="container mt-4 border">
                <div>
                    {Object.keys(lngs).map((lng) => (
                        <button className="btn btn-primary ml-4 mb-2 mt-2" key={lng} style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }} type="submit" onClick={() => changeTheLanguage(lng)}>
                            {lngs[lng].nativeName}
                        </button>
                    ))}
                </div>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <p>
                                <Trans i18nKey="description.part1">
                                    Edit <code>src/App.js</code> and save to reload.
                                </Trans>
                            </p>
                            <button
                                className="btn btn-link bg-danger text-light border btn-block"
                            >
                                {t('description.part2')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
export default About;
