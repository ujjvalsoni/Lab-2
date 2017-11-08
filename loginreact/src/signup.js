import React from 'react';

export class Signup extends React.Component{

    render() {
        return (
            <div>
                <form method = "POST" action = "http://localhost:5000/users/add">
                    Email:<br/>
                    <input type="email" name="email" required/>
                    <br/><br/>
                    PassWord:<br/>
                    <input type="PassWord" name="password" required/>
                    <br/><br/>
                    First name:<br/>
                    <input type="text" name="fname" required/>
                    <br/><br/>
                    Last name:<br/>
                    <input type="text" name="lname" required/>
                    <br/><br/>
                    Age:<br/>
                    <input type="number" name="age" required/>
                    <br/><br/>
                    Date of Birth:<br/>
                    <input type="Date" name="DOB" required/>
                    <br/><br/>
                    Gender
                    <br/>
                    <input class="w3-radio" type="radio" name="gender" value="Male" />Male
                    <br/>
                    <input class="w3-radio" type="radio" name="gender" value="Female" />Female
                    <br/><br/>

                    <input type="submit" value="Submit"/>
                </form>
            </div>

        );
    }
}
