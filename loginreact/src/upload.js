import React from 'react';
import {getlogin,getgrpnames} from './api/api';
import {Navbar1} from "./navbar";
//import './App.css';
import ReactDOMServer from 'react-dom/server';

export class Upload extends React.Component{

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

    render(){
        let button = null;
        if (this.state.count === 1) {
            button =<div>
                <Navbar1/>
                <form className="fileupload" action="http://localhost:5000/upload/" method="post" enctype="multipart/form-data">
                    <h1>Upload File Here</h1>
                    <label for="file-upload" className="custom-file-upload">
                        <i class="fa fa-cloud-upload"/> Click here to Choose
                    </label>
                    <input id="file-upload" type="file" name="upfile"/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <h2>List of Groups</h2>
                <div className="well">
                    <ul className="list-group">
                        {this.state.list.map((item,index) =>
                            <li key={index} className={"list-group-item list-group-item-info"}>
                                <h1>{item}</h1>
                                <form className="fileupload" action={`http://localhost:5000/uploadgroups/${ReactDOMServer.renderToString(item)}`} method="post" enctype="multipart/form-data">
                                    <label for="file-upload" className="custom-file-upload">
                                        <i class="fa fa-cloud-upload"/> Click here to Choose
                                    </label>
                                    <input id="file-upload" type="file" name="upfiles"/>
                                    <br/>
                                    <input type="submit" value="Submit"/>
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
                <h1>You are not signed in!!</h1>
                <a href={"http://localhost:3000/#/"}>Sign In!!</a>
            </div>;
        }

        return (
            <div>
                {button}
            </div>
        );
    }
}