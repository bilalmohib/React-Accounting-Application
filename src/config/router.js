import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from '../Pages/Home';
import About from "../Pages/About";
import Actual from "../Pages/Actual";
import Login from "../Pages/Login";

function AppRouter() {

    return (
        <Router>
            <Route exact path="/" component={Actual} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/v2" component={Actual} />
        </Router>
    )
}
export default AppRouter;