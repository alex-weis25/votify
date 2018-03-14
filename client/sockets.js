import io from 'socket.io-client';
import { dispatch } from 'react-redux'
import store, { fetchQueue, fetchVotify, fetchCurrent } from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('newQueue', () => {
  console.log('newQueue socket')
  store.dispatch(fetchQueue());
})

socket.on("addVotify", () => {
  console.log("updating song");
  store.dispatch(fetchVotify())
})

export default socket
