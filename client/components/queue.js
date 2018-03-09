import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import socket from '../sockets';


export class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      search: ''
    };
  }

  onClick = (event) => {
    event.preventDefault();
    let { name, value } = event.target;
    const data = {
      name: name,
      value: +value
    }
    axios.put('./api/queue', data)
    .then(next => {
      console.log("emitting voted")
      socket.emit('voted')
    })
    .catch(error => console.log(error));
  }

  render() {
    const queue = this.props.newList;
    console.log("props on queue", this.props);
    // console.log("Queue", queue);
    return (
      <div id="queue-list">
        <h3> Queue list </h3>
        <form id="search-bar-form" onSubmit={this.onSubmit}>
          {queue &&
            queue.map(song => {
              return (
                <div>
                  <option key={song.id} name={song.name}>
                    Title: {song.name} votes: {song.score}
                  </option>
                  <button name={song.name} value='1' onClick={this.onClick}>upVote</button>
                  <button name={song.name} value='-1' onClick={this.onClick}>downVote</button>
                </div>
              );
            })}
        </form>
      </div>
    );
  }
}


const mapState = ({ Queue }) => ({ Queue })

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Queue)
