import React, { Component } from "react";
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom'



import { SearchBar } from './components/searchBar';
import { Login } from './components/login';
import { Queue } from './components/queue';
import { fetchQueue } from './store/queue.js'


export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      queue: [],
      loggedIn: ''
    }
  }

  componentDidMount(){
    this.props.loadInitialData();
  }

  render() {
    console.log("props: on app", this.props.Queue)
    const songList = this.props.Queue.queue
    const loggedIn = this.state.loggedIn;
    return (
        <div>
          <div>
            <h3> Spotify playlist </h3>
            <SearchBar />
            <Queue newList={songList}/>
          </div>
        </div>
    );
  }
};

// export default App;

const mapState = ({ Queue }) => ({ Queue })

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(fetchQueue());
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(App)
