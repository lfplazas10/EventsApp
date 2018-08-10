import React from 'react'
import {Link} from 'react-router-dom'
import './Signup.css'

class Signup extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isUserLogged  : false,
      processing    : false
    };
    this.submit = this.submit.bind(this);
  }
  
  submit(e){
    e.preventDefault();
    this.setState({processing:true}, () => {
      axios
    })
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
      </div>
    );
  }
}
export default Signup;
