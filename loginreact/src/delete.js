import React from 'react';
import {getlistfiles, getlogin} from './api/api';
import ReactDOMServer from 'react-dom/server';
import {Navbar1} from "./navbar";
import {Notlogin} from "./notlogin";

export class Delete extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            count: ''
        };
    }

    listdir() {
        getlistfiles().then((list) => {
            this.setState({list});
            console.log(list);
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
            button = <div>
                <Navbar1/>

                <h2>Click on the link to delete that file!!</h2>
                <div classname="well">
                    <ul classname="list-group">
                        <br/>
                        {this.state.list.map((item,index) =>
                            <li key={index} className={"list-group-item list-group-item-info"}>
                                <a href={`http://localhost:5000/delete/${ReactDOMServer.renderToString(item)}`}> {item}</a>
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
