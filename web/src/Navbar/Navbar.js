import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

class Navbar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isUserLogged : false
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
                <li role="presentation" data-toggle="collapse" data-target=".nav-collapse.show"
                    className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                     aria-haspopup="true" aria-expanded="false">
                    What do you want to do today?
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item" data-toggle="collapse" data-target=".nav-collapse.show">
                      <a onClick={() => null}>View events</a>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".nav-collapse.show">
                      <a onClick={() => null}>Create event</a>
                    </li>
                  </ul>
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
