import React, { Component } from "react";
import axios from "axios";

//Credentials
const id = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;
const callback = process.env.SPOTIFY_CLIENT_REDIRECT;
const authUri = "https://accounts.spotify.com/authorize";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      tracks: []
    };
  }

  onSongAdd = event => {
    event.preventDefault();
    const { name } = event.target;
    const addSong = this.state.tracks[name]
    // console.log("on song add: ", name, this.state.tracks[name])
    const content = {
      name: addSong.name,
      artist: addSong.artist,
      songId: addSong.id
    }
    axios.post('/api/search', content)
  }

  onSearchClick = event => {
    event.preventDefault();
    const track = this.state.search.split(" ").join("+");
    const accessToken = this.props.accessToken;
    console.log("track in onSearchClick!!", track);
    //Search tracks
    let uri = "https://api.spotify.com/v1/search?q=";
    axios
      .get(`${uri}${track}&type=track`, {
        headers: { Authorization: "Bearer " + accessToken }
      })
      .then(response => {
        const tracks = response.data.tracks.items;
        console.log("song info: ", tracks);
        console.log("song 1 name: ", tracks[0].name);
        console.log("artist 1 name: ", tracks[0].artists[0].name);
        console.log("song 2 name: ", tracks[1].name);
        console.log("artist 2 name: ", tracks[1].artists[0].name);
        this.setState({
          tracks: [
            {
              name: tracks[0].name,
              artist: tracks[0].artists[0].name,
              id: tracks[0].id
            },
            {
              name: tracks[1].name,
              artist: tracks[1].artists[0].name,
              id: tracks[1].id
            },
            {
              name: tracks[2].name,
              artist: tracks[2].artists[0].name,
              id: tracks[2].id
            }
          ]
        });
        // this.setState({ search: response.data.display_name,
        // accessToken });
      });
    console.log("news songs on state?", this.state);
    // const content = {
    //   name: artist,
    //   artist: "default artist"
    // }
    // axios.post('/api/search', content)
    // .then(results => console.log(results))
    // axios.get('/api/search/artist', content)
    // .then(results => console.log(results.data))
    // .catch(error => console.log(error))
  };

  handleChange = event => {
    event.preventDefault();
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
    // console.log("search: ", this.state.search)
  };

  render() {
    // console.log("props on searchBar: ", this.props);
    const currentSongs = this.state.tracks;
    console.log("currentSongs: ", currentSongs);
    return (
      <div id="search-bar">
        <form id="search-bar-form" onSubmit={this.onSearchClick}>
          <input
            name="search"
            className="form-control"
            value={this.state.search}
            onChange={this.handleChange}
            placeholder="search artist"
          />
          <button type="submit">Submit</button>
        </form>
        <div class="playlist">
          <div class="loader">
            <div class="inner-circle" />
          </div>
        </div>
        <div id="search-items">
          {currentSongs &&
            currentSongs.map((song, index) => {
              return (
                <div>
                  <option key={song.name}>
                    <h4>
                      {song.name} by {song.artist}
                    </h4>
                  </option>
                  <button name={index} onClick={this.onSongAdd}>Add to playlist</button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
