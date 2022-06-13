import React from "react";
import { Link } from 'react-router-dom'

function Home() {
    return <div className="homeTab">
            <button className="title"><Link to='/' style={{ textDecoration: 'none', color: "inherit"}}>iChat</Link></button>
            <div className="loginMessage">Login and start chatting!</div>
            <div className="registerMessage">Don't have an account?</div>
            <button className="loginButton" type="button"><Link to='/login' style={{ textDecoration: 'none', color: "inherit"}}>Login</Link></button>
            <button className="registerButton" type="button"><Link to='/register' style={{ textDecoration: 'none', color: "inherit"}}>Sign up</Link></button>
        </div>
}

export default Home;