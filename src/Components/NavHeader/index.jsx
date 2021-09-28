import React from "react";
import i18n from "../../i18n";
//Importing useTranslation and Trans from react-i18next
import { useTranslation, Trans } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import "./style.scss";

const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' },
    chi: { nativeName: 'Chinese' },
    ar: { nativeName: 'Arabic' }
};

const Arrow = () => {
    return (
        <i className="RightArrow fas fa-chevron-right"></i>
    )
}

const NavHeader = (props) => {
    const { t } = useTranslation();
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
                    <span onClick={() => MoveTo(`/`)} className="navheader-text mb-0"> {t('description.head')}</span>
                </div>
            </nav>
        </>
    )
}
export default NavHeader;