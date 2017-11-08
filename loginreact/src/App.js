import React from 'react';
import {getlogin, getuser} from './api/api';
import {Notlogin} from "./notlogin";
import {Navbar1} from "./navbar";

export class App extends React.Component {


    constructor() {
        super();
        this.state = {
            user: [],
            login: 0
        };
    }

    app() {
        getlogin().then((count) => {
            this.setState({count:count.count});
            console.log(count);
        });

        getuser().then((user) => {
          this.setState({user});
            console.log(user);
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
              <h2>Welcome,  {this.state.user.fname}!!</h2>
                <h3>
                    Your Information is as follows!
                </h3>

                <ul>
                    <li>Your First Name is: {this.state.user.fname}</li>
                    <li>Your Last Name is: {this.state.user.lname}</li>
                    <li>Your Email is: {this.state.user.email}</li>
                    <li>Your Age is: {this.state.user.age} year(s)</li>
                    <li>Your Gender is: {this.state.user.gender}</li>
                </ul>
              </div>;

        }

        else{
            button =
                <div>
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

