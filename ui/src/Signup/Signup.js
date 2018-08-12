import './Signup.css';
import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router'
import SweetAlert from 'react-bootstrap-sweetalert';

class Signup extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      alert           : null,
      isUserLogged    : false,
      processing      : false,
      redirect        : false,
      email           : '',
      password        : ''
    };
    this.submit       = this.submit.bind(this);
    this.hideAlert    = this.hideAlert.bind(this);
    this.showError    = this.showError.bind(this);
    this.showSuccess  = this.showSuccess.bind(this);
  }
  
  showSuccess(message){
    this.setState({ alert:
        <SweetAlert
          success
          confirmBtnText="Login"
          confirmBtnBsStyle="success"
          title="Success"
          onConfirm={() => this.setState({ redirect: true})}
          onCancel={this.hideAlert}
        >
          {'Message: '+message}
        </SweetAlert>
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
  
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  
  submit(e){
    e.preventDefault();
    this.setState({processing : true}, () => {
      axios.post('/api/user', {
        email     : this.state.email,
        password  : this.state.password
      })
        .then((response) => {
          this.showSuccess('User created, you can now login');
          this.setState({processing : false});
        })
        .catch((error) => {
          this.showError(error.response.data.error);
          this.setState({processing : false});
        });
    })
  }
  
  render(){
    return(
      <div className="container" id="loginContainer">
        {this.state.redirect &&
        <Redirect to='/login'/>}
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="login-panel panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Register in our platform</h3>
              </div>
              <div className="panel-body">
                <form role="form" id="loginForm" onSubmit={this.submit}>
                    <div className="form-group">
                      <input className="form-control" onChange={(e) => this.setState({email: e.target.value}) }
                             value={this.state.email}
                             placeholder="Email" name="email" type="email" id="emailField"
                             required
                             autoFocus/>
                    </div>
                    <div className="form-group">
                      <input className="form-control" onChange={(e) => this.setState({password: e.target.value}) }
                             value={this.state.password}
                             placeholder="Password" name="password" type="password"
                             required
                             id="passwordField"/>
                    </div>
                
                    
                    <button id="signupButton" type="submit"
                            disabled={this.state.processing}
                       className="btn btn-lg btn-success btn-block">
                      { this.state.processing ?
                        <img id="loadingSpinner"
                             src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="28" height="28"/>
                        :
                        <span>Signup</span>
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
export default Signup;
