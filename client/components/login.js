import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: ''
    }
  }

  onClick = (event) => {
    // event.preventDefault();

  }

  render() {

    return (
      <div id="login">
        <Link to='/login'>Login with Spotify</Link>
      </div>
    );
  }
};
