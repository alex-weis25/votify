import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import queryString from "query-string";
import socket from './sockets';
import axios from "axios";

//Import components
import { SearchBar } from "./components/searchBar";
import { Login } from "./components/login";
import { Queue } from "./components/queue";
import { fetchQueue } from "./store/queue.js";


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      loggedIn: "",
      accessToken: ''
    };
  }

  componentDidMount() {
    this.props.loadInitialData();
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    console.log("access token&&", accessToken, parsed);
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: { Authorization: "Bearer " + accessToken }
      })
      .then(response => {
        this.setState({ loggedIn: response.data.display_name,
        accessToken });
      });
  }

  onClick = event => {
    event.preventDefault();

    console.log("history in props?", this.props);
  };

  render() {
    console.log("props: on app", this.props);
    // console.log(this.state);
    const songList = this.props.Queue.queue;
    const loggedIn = this.state.loggedIn;
    return (
      <div>
        <div>
          <h3> Spotify playlist </h3>
          <SearchBar accessToken={this.state.accessToken}/>
          <Queue newList={songList}/>
        </div>
      </div>
    );
  }
}

const mapState = ({ Queue }) => ({ Queue });

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(fetchQueue());
    }
  };
};

export default connect(mapState, mapDispatch)(App);

//To figure out login
// <div>
// // {!this.state.loggedIn ? (
//   <div id="login">
//   <button onClick={this.onClick}>Login with Spotify</button>
// </div>
// ) : (
//   <div>
//     <h3> Spotify playlist </h3>
//     <SearchBar />
//     <Queue newList={songList} />
//   </div>
// )}
// </div>
