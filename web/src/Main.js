import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router';
import Login from './Login/Login.js'
import Signup from './Signup/Signup.js'

// The Main component renders one of the provided routes (provided that one matches).
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={MainRedirect}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={Signup}/>
      <Route path="/error" component={NotFound}/>
    </Switch>
  </main>
)

const MainRedirect = () => (
    <Redirect push to="/login"/>);

const NotFound = () => (
  <h1>404.. This page is not found!</h1>);

export default Main;
