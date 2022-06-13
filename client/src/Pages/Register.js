import React from "react";
import { useState } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom'

function Register() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState(""); 
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [fillError, setFillError] = useState(false);

    const register = () => {
        if(!email || !firstName || !lastName || !userName || !password || !confirmedPassword) {
            setFillError(true);
            return;
        }
        else {
            setFillError(false);
        }
        Axios.post("http://localhost:3001/checkEmail", {
            email: email
        }).then((response) => {
            if (!response.data.registered) {
                setEmailError(true);
            } else {
                setEmailError(false);
                Axios.post("http://localhost:3001/checkUserName", {
                    userName: userName
                }).then((response) => {
                    if(!response.data.registered) {
                        setUserNameError(true);
                    }
                    else {
                        setUserNameError(false);
                        Axios.post("http://localhost:3001/register", {
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                            userName: userName,
                            password: password,
                            confirmedPassword: confirmedPassword
                        }).then((response)=> {
                            console.log(response);
                            if(!response.data.registered) {
                                console.log("no")
                                setPasswordError(true);
                            } 
                            else {
                                console.log("yes")
                                setPasswordError(false);
                            }
                        });
                    }
                });
            }
        });
    };
    return <div className="Register">
        <button className="title"><Link to='/' style={{ textDecoration: 'none', color: "inherit"}}>iChat</Link></button>
        <input type="text" placeholder="Email"
        style={{position: "absolute", top: "120px", height: "32px", width: "250px", padding:"5px", backgroundColor: "#fafafa", borderColor: "#e4e4e4", borderWidth: "1.5px", borderStyle: "solid"}}
        onChange={(e) => {
            setEmail(e.target.value);
        }}
        />
        <input type="text" placeholder="First Name"
        style={{position: "absolute", top: "170px", height: "32px", width: "250px", padding:"5px", backgroundColor: "#fafafa", borderColor: "#e4e4e4", borderWidth: "1.5px", borderStyle: "solid"}}
        onChange={(e) => {
            setFirstName(e.target.value);
        }}
        />
        <input type="text" placeholder="Last Name"
        style={{position: "absolute", top: "220px", height: "32px", width: "250px", padding:"5px", backgroundColor: "#fafafa", borderColor: "#e4e4e4", borderWidth: "1.5px", borderStyle: "solid"}}
        onChange={(e) => {
            setLastName(e.target.value);
        }}
        />
        <input type="text" placeholder="Username"
        style={{position: "absolute", top: "270px", height: "32px", width: "250px", padding:"5px", backgroundColor: "#fafafa", borderColor: "#e4e4e4", borderWidth: "1.5px", borderStyle: "solid"}}
        onChange={(e) => {
            setUserName(e.target.value);
        }}
        />
        <input type="password" placeholder="Password"
        style={{position: "absolute", top: "320px", height: "32px", width: "250px", padding:"5px", backgroundColor: "#fafafa", borderColor: "#e4e4e4", borderWidth: "1.5px", borderStyle: "solid"}}
        onChange={(e) => {
            setPassword(e.target.value);
        }}
        />
        <input type="password" placeholder="Confirm Password"
        style={{position: "absolute", top: "370px", height: "32px", width: "250px", padding:"5px", backgroundColor: "#fafafa", borderColor: "#e4e4e4", borderWidth: "1.5px", borderStyle: "solid"}}
        onChange={(e) => {
            setConfirmedPassword(e.target.value);
        }}
        />
        <button 
            style={{cursor: "pointer", borderRadius: "20px", padding: "15px 80px", fontSize: "16pt", color: "white", position: "absolute", top: "425px", border: "0", backgroundColor: "#0096f6"}}
            onClick={register}>Register</button>
        <div style={{backgroundColor: "#8e8e8e", padding: "0.5px 60px", position: "absolute", top: "509px", left: "105px"}}></div>
        <div style={{color: "#8e8e8e" , position: "absolute", top: "500px"}}>OR</div>
        <div style={{backgroundColor: "#8e8e8e", padding: "0.5px 60px", position: "absolute", top: "509px", left: "275px"}}></div>
        <div style={{position: "absolute", top: "555px", position: "absolute", left: "132px", fontSize: "18px"}}>Already have an account?</div>
        <button style={{cursor: "pointer",position: "absolute", top: "556px", left: "320px",border: "none", background: "none", color: "#4495ff", fontWeight: "bold", fontSize: "15px"}}><Link to='/login' style={{ textDecoration: 'none', color: "inherit"}}>Login</Link></button>
        {emailError && (
            <span style={{position: "absolute", top: "131px", left: "350px"}} className="dot">x</span>
        )}
        {emailError && (
            <span style={{fontSize: "12px", color: "red", position: "absolute", top: "135px", left: "390px"}}>Email already exists</span>
        )}
        {userNameError && (
            <span style={{position: "absolute", top: "281px", left: "350px"}} className="dot">x</span>
        )}  
        {userNameError && (
            <span style={{fontSize: "12px", color: "red", position: "absolute", top: "279px", left: "390px"}}>Username already exists</span>
        )} 
        {passwordError && (
            <span style={{position: "absolute", top: "381px", left: "350px"}} className="dot">x</span>
        )}
        {passwordError && (
            <span style={{fontSize: "12px", color: "red", position: "absolute", top: "379px", left: "390px"}}>Confirmed password doesn't match</span>
        )}
        {fillError && (
            <div style={{color: "red", position: "absolute", top: "20px"}}>You must fill in all of the fields</div>
        )}
    </div>;
}

export default Register;