import React from 'react'
import {Link} from 'react-router-dom'
import './Register.css'

class Register extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isUserLogged: false
    };
  }
  
  render(){
    return(
      <div className="container" id="loginContainer">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="login-panel panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Register in our platform</h3>
              </div>
              <div className="panel-body">
                <form role="form" id="loginForm">
                  <fieldset>
                    <div className="form-group">
                      <input className="form-control" placeholder="Email" name="email" type="email" id="emailField"
                             autoFocus/>
                    </div>
                    <div className="form-group">
                      <input className="form-control" placeholder="Password" name="password" type="password"
                             id="passwordField" value=""/>
                    </div>
                
                    
                    <a id="loginButton" className="btn btn-lg btn-success btn-block">Register
                      <img id="loadingSpinner"
                           src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="28" height="28"/>
                    </a>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
