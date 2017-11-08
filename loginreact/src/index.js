import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Router, Route, hashHistory} from "react-router";
import registerServiceWorker from './registerServiceWorker';
import {Login} from "./login";
import {App} from './App';
import {Signup} from "./signup";
import {Listfiles} from "./listfiles";
import {Navbar1} from "./navbar";
import {Upload} from "./upload";
import {Delete} from "./delete";
import {Groups} from "./group";
import {Log} from "./log";
import {Star} from "./star";

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/home" component={App}>
        </Route>
        <Route path="/" component={Login}>
        </Route>
        <Route path="/signup" component={Signup}>
        </Route>
            <Route path="/listfiles" component={Listfiles}>
            </Route>
        <Route path="/navbar" component={Navbar1}>
        </Route>
        <Route path="/upload" component={Upload}>
        </Route>
        <Route path="/delete" component={Delete}>
        </Route>
        <Route path="/groups" component={Groups}>
        </Route>
        <Route path="/log" component={Log}>
        </Route>
        <Route path="/star" component={Star}>
        </Route>

    </Router>
    , document.getElementById('root'));
registerServiceWorker();
