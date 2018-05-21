import { combineReducers } from 'redux';
import {
  REQUEST_ROUTE,
  RECEIVE_ROUTE_SUCCESS,
  RECEIVE_ROUTE_ERROR,
  SET_START,
  SET_END,
} from '/app/actions';

function route(state = {}, action) {
  switch (action.type) {
    case REQUEST_ROUTE:
      return { ...state, isFetching: true };
    case RECEIVE_ROUTE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        path: action.path,
        stations: action.stations,
      };
    case RECEIVE_ROUTE_ERROR:
      return { ...state, isFetching: false, error: action.error };
    case SET_START:
      return { ...state, start: action.start };
    case SET_END:
      return { ...state, end: action.end };
    default:
      return state;
  }
}

const ceburiloApp = combineReducers({
  route,
});

export default ceburiloApp;
