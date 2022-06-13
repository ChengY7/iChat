import React, { useEffect } from "react";
import { useState } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [loginMessage, setLoginMessage] = useState("");

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then(response => {
            if(response.data.loggedIn==true) {
                setLoginMessage("")
            } else {
                setLoginMessage("");
            }
        })
    }, [])

    const login = () => {
        if(!email || !password) {
            setLoginMessage("You must fill in all the fields");
            return;
        }
        else {
            setLoginMessage("");
        }
        Axios.post("http://localhost:3001/login", {
            email: email,
            password: password,
        }).then((response)=> {
            if (!response.data.auth) {
                setLoginMessage(response.data.message);
            } else {
                console.log(response.data);
                setLoginMessage("Logged in");
            }
        });
    };

    return <div className="Login">
        <button className="title"><Link to='/' style={{ textDecoration: 'none', color: "inherit"}}>iChat</Link></button>
        <input type="text" placeholder="Username"
        style={{position: "absolute", top: "150px", height: "32px", width: "250px", padding:"5px", backgroundColor: "#fafafa", borderColor: "#e4e4e4", borderWidth: "1.5px", borderStyle: "solid"}}
        onChange={(e) => {
            setEmail(e.target.value);
        }}
        />
        <input type="password" placeholder="Password"
        style={{position: "absolute", top: "210px", height: "32px", width: "250px", padding:"5px", backgroundColor: "#fafafa", borderColor: "#e4e4e4", borderWidth: "1.5px", borderStyle: "solid"}}
        onChange={(e) => {
            setPassword(e.target.value);
        }}
        />
        <button 
        style={{cursor: "pointer", borderRadius: "20px", padding: "15px 90px", fontSize: "16pt", color: "white", position: "absolute", top: "280px", border: "0", backgroundColor: "#0096f6"}} 
        onClick={login}>Login</button>
        <div style={{backgroundColor: "#8e8e8e", padding: "0.5px 60px", position: "absolute", top: "399px", left: "105px"}}></div>
        <div style={{color: "#8e8e8e" , position: "absolute", top: "390px"}}>OR</div>
        <div style={{backgroundColor: "#8e8e8e", padding: "0.5px 60px", position: "absolute", top: "399px", left: "275px"}}></div>
        <div style={{position: "absolute", top: "455px", position: "absolute", left: "135px", fontSize: "18px"}}>Don't have an account?</div>
        <button style={{cursor: "pointer",position: "absolute", top: "456px", left: "305px",border: "none", background: "none", color: "#4495ff", fontWeight: "bold", fontSize: "15px"}}><Link to='/register' style={{ textDecoration: 'none', color: "inherit"}}>Sign up</Link></button>
        <div style={{color: "red", position: "absolute", top: "20px"}}>{loginMessage}</div>
    </div>;
}

export default Login;