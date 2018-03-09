import io from 'socket.io-client';
import { dispatch } from 'react-redux'
import store, { fetchQueue } from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('newQueue', () => {
  console.log('in the socket newQueue')
  console.log("fetching queue!", dispatch)
  store.dispatch(fetchQueue());
})


export default socket
