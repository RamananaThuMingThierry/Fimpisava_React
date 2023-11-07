import './App.css';
import React from "react";
import './assets/back_end/css/styles.css';
import { Switch } from "react-router-dom";
import AdminPrivateRoute from "./AdminPrivateRoute";
import PublicRoute from "./PublicRoute";
import axios from 'axios';
import BASE_URL from './BasesUrl';
axios.defaults.baseURL = BASE_URL;
// axios.defaults.baseURL ="http://localhost:8000";
// axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  return config;
});

function App (){
    return (
      <div className="App">
          <Switch>
            <AdminPrivateRoute path="/admin" name="Admin"/>
            <PublicRoute path="/" name="Accueil"/>
          </Switch>
      </div>
    );
  }

export default App;
