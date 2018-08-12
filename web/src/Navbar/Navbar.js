import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import {logOutUser} from '../Auth.js'
import {isUserLogged} from '../Auth.js'

class Navbar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isUserLogged : isUserLogged()
    };
  }

  render() {
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/" >Event manager</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                {/*Menu options dropdown*/}
                { this.state.isUserLogged &&
                <li data-toggle="collapse" data-target=".nav-collapse.show">
                  <Link to='/events'>Events</Link>
                </li>
                }
                { this.state.isUserLogged &&
                <li data-toggle="collapse" data-target=".nav-collapse.show" onClick={()=>logOutUser()}>
                  <Link to='/login'>Logout</Link>
                </li>
                }
                { !this.state.isUserLogged &&
                <li data-toggle="collapse" data-target=".nav-collapse.show">
                  <Link to='/signup'>Sign up</Link>
                </li> }
                { !this.state.isUserLogged &&
                <li data-toggle="collapse" data-target=".nav-collapse.in">
                  <Link to='/login'>Login</Link>
                </li> }
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}

export default Navbar;
