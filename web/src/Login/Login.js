import React from 'react'
import './Login.css'
import axios from "axios/index";
import { Redirect } from 'react-router'
import SweetAlert from 'react-bootstrap-sweetalert';

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      processing      : false,
      email           : '',
      password        : ''
    };
    this.submit       = this.submit.bind(this);
    this.hideAlert    = this.hideAlert.bind(this);
    this.showError    = this.showError.bind(this);
  }
  
  submit(e){
    e.preventDefault();
    this.setState({processing : true}, () => {
      axios.post('/api/login', {
        email     : this.state.email,
        password  : this.state.password
      })
        .then((response) => {
          alert('good');
          this.setState({processing : false});
        })
        .catch((error) => {
          this.showError(error.response.data.error);
          this.setState({processing : false});
        });
    })
  }
  
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  
  showError(message){
    this.setState({ alert:
        <SweetAlert
          error
          confirmBtnText="Ok"
          confirmBtnBsStyle="danger"
          title="Error"
          onConfirm={this.hideAlert}
          onCancel={this.hideAlert}
        >
          {'Message: '+message}
        </SweetAlert>
    });
  }
  
  render(){
    return(
      <div className="container" id="loginContainer">
        <div className="">
          <div className="col-md-4 col-md-offset-4">
            <div className="login-panel panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Login into our platform</h3>
              </div>
              <div className="panel-body">
                <form id="loginForm" onSubmit={this.submit}>
                    <div className="form-group">
                      <input className="form-control" placeholder="Email" name="email"
                             value={this.state.email}
                             onChange={(e) => this.setState({email: e.target.value}) }
                             type="email" id="emailField" required
                             autoFocus/>
                    </div>
                    <div className="form-group">
                      <input className="form-control" placeholder="Password" name="password"
                             value={this.state.password}
                             onChange={(e) => this.setState({password: e.target.value}) }
                             type="password" required
                             id="passwordField"/>
                    </div>
                    <button id="loginButton" disabled={this.state.processing} type="submit"
                            className="btn btn-lg btn-success btn-block">
                      { this.state.processing ?
                        <img id="loadingSpinner"
                             src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="28" height="28"/>
                        :
                        <span>Login</span>
                      }
                    </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        { this.state.alert }
      </div>
    );
  }
}
export default Login;
