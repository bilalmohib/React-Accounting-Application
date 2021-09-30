import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from '../Pages/Home';
import About from "../Pages/About";

function AppRouter() {

    return (
        <Router>
            <Route exact path="/" component={Home} />
        </Router>
    )
}
export default AppRouter;