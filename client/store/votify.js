import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_VOTIFY = 'GET_VOTIFY'
const GET_CURRENT = 'GET_CURRENT'


/**
 * INITIAL STATE
 */
const initialState = {
  votify: [],
  currentTrack: []
};

/**
 * ACTION CREATORS
 */
const getVotify = votify => ({type: GET_VOTIFY, votify})
const getCurrent = current => ({type: GET_CURRENT, current})

/**
 * THUNK CREATORS
 */
export const fetchVotify = () =>
  dispatch => {
    axios.get('/api/playlist/playlist')
      .then(res => {
        dispatch(getVotify(res.data))
      })
      .catch(err => console.log(err))
  }

  export const fetchCurrent = () =>
  dispatch => {
    axios.get('/api/playlist/currentTrack')
      .then(res => {
        dispatch(getCurrent(res.data))
      })
      .catch(err => console.log(err))
  }



/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VOTIFY:
      return Object.assign({}, state, {votify: action.votify})

      case GET_CURRENT:
      return Object.assign({}, state, {current: action.current})

    default:
      return state
  }
}
