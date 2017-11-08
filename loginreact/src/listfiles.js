import React from 'react';
import {getlogin, getlistfiles} from './api/api';
import ReactDOMServer from 'react-dom/server';
import {Notlogin} from "./notlogin";
import {Navbar1} from "./navbar";
import {Star} from "./star";

export class Listfiles extends React.Component {
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

        getlistfiles().then((list) => {
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
                <h2>List of Files</h2>
                <h4>Click on any file to download it!!</h4>
                <div classname="well">
                    <ul classname="list-group">
                        {this.state.list.map((item,index) =>
                            <li key={index} className={"list-group-item list-group-item-info"}>
                                <a href={`http://localhost:5000/download/${ReactDOMServer.renderToString(item)}`}> {item}<Star/></a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>;
        }

        else{
            //this.setState({list:[]});
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
