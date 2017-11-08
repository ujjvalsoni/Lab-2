import React from 'react';
import {getlogin, getlog} from './api/api';
import {Notlogin} from "./notlogin";
import {Navbar1} from "./navbar";

export class Log extends React.Component {
    constructor() {
        super();
        this.state = {
            list1: [],
            list : [],
            count: ''
        };
    }

    listdir() {
        /*
        getlistdir().then((list1) => {
            this.setState({list1});
        });
        */

        getlog().then((list) => {
            this.setState({list});
        });


        getlogin().then((count) => {
            this.setState({count:count.count});
        });

    }

    componentDidMount() {
        this.listdir();

    }

    render() {
        let button = null;
        if (this.state.count === 1) {

            button =<div >
                <Navbar1/>
                <h2>Log of all the activities by you!</h2>
                <div classname="well">
                    <ul classname="list-group">
                        {this.state.list.map((item,index) =>
                            <li key={index} className={"list-group-item list-group-item-info"}>
                                {item}
                            </li>
                        )}

                    </ul>
                </div>
            </div>;
        }

        else{
            button = <div>
                <Notlogin/>
            </div>;
        }

        return (
            <div>
                {button}
            </div>
        );
    }
}
