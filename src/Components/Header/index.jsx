import React,{useState,useEffect} from "react";
import i18n from "../../i18n";
//Importing useTranslation and Trans from react-i18next
import { useTranslation, Trans } from 'react-i18next';
import { Link } from "react-router-dom";
import "./style.scss";

const Header = () => {
    const { t } = useTranslation();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand navbar-text" to='/'>{t('description.Nav')}</Link>
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/'>{t('description.home')}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/${t('description.short_name')}/${t('description.url')}`} tabIndex={-1} aria-disabled="true">{t('description.url')}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header;