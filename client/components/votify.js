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
    axios
      .delete("/api/queue")
      .then(deleted => {
        return socket.emit("newVotify");
      })
      .then(() => {
        return socket.emit("newVotify2");
      })
      .then(() => {
        socket.emit("redirect");
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
    let songCSS = "track-item"
    return (
      <div id="queue-list">
        <h2 className="component-title"> Votify playlist</h2>
        <div id="playlist-tracks">
          {tracks &&
            tracks.map(track => {
              {track.track.id === current ? (songCSS = 'currently-playing') : (songCSS = 'track-item')
              }
              return (
                <div>
                  <div className={songCSS}>
                    <div className="album-art">
                      <img src={track.track.album.images[0].url} />
                    </div>
                    <div id="now-playing" />
                    <div
                      className="track-details"
                      key={track.track.id}
                      name={track.track.name}
                    >
                      <div className={`track-name-${songCSS}`}>{track.track.name}</div>
                      <div className={`track-artist-${songCSS}`}>
                        {track.track.artists[0].name}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              );
              songCSS = "track-item";
            })}
        </div>
      </div>
    );
  }
}

const mapState = ({ Votify }) => ({ Votify });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Votify);
