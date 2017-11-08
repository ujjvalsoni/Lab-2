import React from 'react';
import {getlogin ,getgrpnames} from './api/api';
import {Navbar1} from "./navbar";
import {Notlogin} from "./notlogin";
import ReactDOMServer from 'react-dom/server';


export class Groups extends React.Component{

    constructor() {
        super();
        this.state = {
            count: '',
            list: []
        };
    }

    app() {
        getlogin().then((count) => {
            this.setState({count:count.count});
        });
        getgrpnames().then((list) => {
            this.setState({list});
        });
    };

    componentDidMount() {
        this.app();
    }

    render() {
        let button = null;
        if (this.state.count === 1) {
            button = <div>
                <Navbar1/>
                <form method="POST" action="http://localhost:5000/groups">
                    <p>Create a new group:</p>
                    <input type="text" name="grpname"/>
                    <br/><br/>
                    <input type="submit" value="Submit"/>
                </form>

                <h1>List of your groups</h1>
                <div className="well">
                    <ul className="list-group">
                        {this.state.list.map((item,index) =>
                            <li key={index} className={"list-group-item list-group-item-info"}>
                                <h4>{item}</h4>
                                <form method="POST" action={`http://localhost:5000/addmem/${ReactDOMServer.renderToString(item)}`}>
                                    <p>Add members to this group!</p>
                                    <input type="text" name="memname"/>
                                    <br/><br/>
                                    <input type="submit" value="Submit"/>
                                    <br/>
                                    <button type="button" class="btn btn-danger">Delete group!</button>
                                </form>
                            </li>
                        )}
                    </ul>
                </div>
            </div>;
        }
        else{
            button = <div>
                <br/>
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
