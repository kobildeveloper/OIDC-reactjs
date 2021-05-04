import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import { Config, CookieName } from '../model/Config';
import { GetCookieValue, parseToken } from '../model/Functions';

let keycloak;
class AuthorisedPage extends Component{
    constructor(){
        super();
        keycloak = Keycloak(Config);
        this.state = {
            username: parseToken(GetCookieValue(CookieName)).preferred_username
        }
    }
    componentDidMount(){
        keycloak.init({ flow: 'implicit', checkLoginIframe: false }).success(function (authenticated) {
            console.log("Login Successful")
        }).then(() => {
            return false;
        })
        .catch((error) => {
            console.log("Something went wrong due to \n" + error);
        })
    }
    userLogout = () => {
        keycloak.logout({
            redirectUri: window.location.origin
        })
        localStorage.clear();
        sessionStorage.clear(); 
    }
    render(){
        let { username } = this.state;
        return(
            <div className="mdWrapper">
                <img src="./image/logo.png" alt="mIDentity One" />
                <h3>mIdentity Box Demo</h3>
                <h4>React JS - Implicit flow authentication</h4>
                {username ? (<p>Welcome <strong>{username}</strong></p>) : ""}
                <button className="btn-normal" onClick={this.userLogout}>Logout</button>
            </div>
        )
    }
}

export default AuthorisedPage;
