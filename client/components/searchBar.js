import React, { Component } from "react";
import axios from 'axios';

//Credentials
const id = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;
const callback = process.env.SPOTIFY_CLIENT_REDIRECT;
const authUri = 'https://accounts.spotify.com/authorize';


export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const artists = this.state.search
    console.log("artists in onSubmit!!", artists)
    const content = {
      artists,
    }
    // axios.get(`${authUri}?client_id=${id}&response_type=code&redirect_uri=${callback}`)
    // .then(results => console.log(results))
    // .catch(error);
    axios.get('/api/search/artist', content)
    .then(results => console.log(results.data))
    .catch(error => console.log(error))
  }

  handleChange = event => {
    event.preventDefault();
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div id="search-bar">
        <form id="search-bar-form" onSubmit={this.onSubmit}>
          <input
            name="search"
            className="form-control"
            value={this.state.search}
            onChange={this.handleChange}
            placeholder="add content"
          />
          <button type="submit">Submit</button>
        </form>
        <div class="playlist">
          <div class="loader">
            <div class="inner-circle" />
          </div>
        </div>
      </div>
    );
  }
}
