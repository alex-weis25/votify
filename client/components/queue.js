import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from "axios";

const initialQueue = [
  {
    name: "Song 1",
    votes: 0
  },
  {
    name: "Song 2",
    votes: 0
  },
  {
    name: "Song 3",
    votes: 0
  },
  {
    name: "Song 4",
    votes: 0
  }
];



export class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      search: ''
    };
  }

  // onSubmit = (event) => {
  //   event.preventDefault();
  //   const artists = this.state.search
  //   console.log("artists in onSubmit!!", artists)
  //   const content = {
  //     artists,
  //   }
  //   // axios.get(`${authUri}?client_id=${id}&response_type=code&redirect_uri=${callback}`)
  //   // .then(results => console.log(results))
  //   // .catch(error);
  //   axios.get('/api/search/artist', content)
  //   .then(results => console.log(results.data))
  //   .catch(error => console.log(error))
  // }

  onClick = (event) => {
    // event.preventDefault();
    let { name, value } = event.target;
    console.log("name & value:", name, value);
    const data = {
      name: name,
      value: +value
    }
    axios.put('./api/queue', data)
    .then(() => {
      this.props.loadInitialData()
    })
    .catch(error => console.log(error));
  }

  // handleChange = event => {
  //   event.preventDefault();
  //   let { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  render() {
    const queue = this.props.newList;
    // console.log("props on queue", this.props);
    console.log("Queue", queue);
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


const mapState = ({ Queue }) => ({ state })

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(fetchQueue());
    }
  }
}

export default connect(mapState, mapDispatch)(Queue)
