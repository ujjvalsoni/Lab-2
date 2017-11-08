import React from 'react';
import { Link } from 'react-router';
export class Login extends React.Component{

    render() {
        return (
            <div className="Container">
                <form method = "POST" action = "http://localhost:5000/login1">
                    User Name:<br/>
                    <input type="text" name="username" required/>
                    <br/><br/>
                    Password:<br/>
                    <input type="Password" name="password" required/>
                    <br/><br/>
                    <input type="submit" value="Submit"/>
                    or: <Link to="signup">Sign Up</Link>

                </form>
            </div>
        );
    }
}
