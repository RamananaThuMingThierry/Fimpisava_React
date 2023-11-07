import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../components/front_end/auth/Login";
import Register from "../../components/front_end/auth/Register";
import Page403 from "../../components/erreurs/Page403";
import Page404 from "../../components/erreurs/Page404";

class FrontendLayout extends Component{
    render(){
        return (
            <>
                <Switch>
                    <Route  path="/403" component={Page403}/>
                    <Route  path="/404" component={Page404}/>
                    <Route exact path="/register" name="Register">
                        { localStorage.getItem('auth_token') ? <Redirect to="/admin/tableau_de_bord" /> : <Register/>}
                    </Route>
                    <Route  path="/" name="Login">
                        { localStorage.getItem('auth_token') ? <Redirect to="/admin/tableau_de_bord" /> : <Login/>}
                    </Route>
                </Switch>
            </>
        );
    }
}

export default FrontendLayout;