import React from 'react';
import './App.css';


export class Notlogin extends React.Component{

    render(){

        return (
            <div>
                <h1>You are not signed in!!</h1>
                <a href={"http://localhost:3000/#/"}>Sign In!!</a>
            </div>
        );
    }
}