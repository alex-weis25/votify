import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import socket from '../sockets';
import { fetchQueue } from '../store/queue.js'


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
    .then(() => {
      return socket.emit('addSong')
    })
    .then(() => {
      socket.emit('redirect')
    })
    .catch(error => console.log(error))
    // dispatch(fetchQueue())
  }

  onSearchClick = event => {
    event.preventDefault();
    const track = this.state.search.split(" ").join("+");
    const accessToken = this.props.accessToken;
    // console.log("track in onSearchClick!!", track);
    //Search tracks
    let uri = "https://api.spotify.com/v1/search?q=";
    axios
      .get(`${uri}${track}&type=track`, {
        headers: { Authorization: "Bearer " + accessToken }
      })
      .then(response => {
        const tracks = response.data.tracks.items;
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
      });
  };

  handleChange = event => {
    event.preventDefault();
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    // console.log("props on searchBar: ", this.props);
    const currentSongs = this.state.tracks;
    // console.log("Props on searchBar: ", this.props);
    return (
      <div id="search-bar">
        <form id="search-bar-form" onSubmit={this.onSearchClick}>
          <input
            name="search"
            className="form-control"
            value={this.state.search}
            onChange={this.handleChange}
            placeholder="search song by title"
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

const mapState = ({ Queue }) => ({ Queue});

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(fetchQueue());
    }
  };
};

export default connect(mapState, mapDispatch)(SearchBar);
