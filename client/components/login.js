import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: ''
    }
  }

  onClick = (event) => {
    event.preventDefault();
  }

  render() {

    return (
      <div id="login">
        <button onClick={this.onClick}>Login with Spotify</button>
      </div>
    );
  }
};
