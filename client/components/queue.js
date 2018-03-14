import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import socket from "../sockets";

export class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      search: ""
    };
  }

  onClick = event => {
    event.preventDefault();
    console.log("event before:", event.target)
    event.target.disabled = true
    console.log("event after:", event.target)
    let { name, value } = event.target;
    const data = {
      name: name,
      value: +value
    };
    axios
      .put("./api/queue", data)
      .then(next => {
        socket.emit("voted");
      })
      .catch(error => console.log(error));
  };

  render() {
    const queue = this.props.newList;
    let votedTrue = false;
    return (
      <div id="queue-list">
        <h2 className="component-title"> Queue list </h2>
        <form id="search-bar-form" onSubmit={this.onSubmit}>
          {queue &&
            queue.map(song => {
              return (
                <div className="queue-item">
                  <div className="album-art">
                    <img src={song.albumImg} />
                  </div>
                  <div className="item-details" key={song.id} name={song.name}>
                    <div>{song.name} </div>
                    <div>{song.artist} </div>
                    <div> votes: {song.score} </div>
                  </div>
                  <div className="button-container">
                    <button disabled=''
                      className="vote-button-up"
                      name={song.name}
                      value="1"
                      onClick={this.onClick}
                    >
                      upVote
                    </button>
                    <button disabled=''
                      className="vote-button-down"
                      name={song.name}
                      value="-1"
                      onClick={this.onClick}
                    >
                      downVote
                    </button>
                  </div>
                </div>
              );
            })}
        </form>
      </div>
    );
  }
}

const mapState = ({ Queue }) => ({ Queue });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Queue);
