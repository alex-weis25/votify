import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import socket from "../sockets";

export class Votify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  topSong = () => {
    console.log("going to send to spotify");
    axios
      .delete("/api/queue")
      .then(() => {
        console.log("updated playlist!");
        socket.emit('addSong')
        socket.emit('redirect')
      })
      .catch(err => console.log(err));
  };

  render() {
    const currentSong = this.props.Votify.current;
    let current;
    currentSong ? (current = currentSong.item.id) : "";
    const playlist = this.props.Votify.votify.tracks;
    let playlistLength;
    let tracks;
    playlist ? (playlistLength = playlist.items.length) : "";
    playlist ? (tracks = playlist.items) : "";

    //logic for sending song
    let songIndex;
    playlist &&
      playlist.items.forEach((song, index) => {
        if (song.track.id === current) {
          songIndex = index;
        }
      });

    songIndex === playlistLength - 1 ? this.topSong() : "";
    // console.log("props on votify: ", this.props)
    console.log("CurrentSong: & index", current, songIndex);
    return (
      <div id="queue-list">
        <h3> Votify playlist</h3>
        <div id="playlist-tracks">
          {tracks &&
            tracks.map(track => {
              return (
                <div className="track-item">
                  <div id="now-playing">
                    {track.track.id === current ? (
                      <h2> Currently playing </h2>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="album-art">
                    <img src={track.track.album.images[0].url} />
                  </div>
                  <div key={track.track.id} name={track.track.name}>
                    Title: {track.track.name} by: {track.track.artists[0].name}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapState = ({ Votify }) => ({ Votify });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Votify);
