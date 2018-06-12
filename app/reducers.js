import { combineReducers } from 'redux';
import {
  REQUEST_ROUTE,
  RECEIVE_ROUTE_SUCCESS,
  RECEIVE_ROUTE_ERROR,
  LOCATION_PERMISSION_CHANGE,
  LOCATION_CHANGE,
  CHANGE_FORM,
  SET_STATION,
} from '/app/actions';

function route(state = {}, action) {
  switch (action.type) {
    case REQUEST_ROUTE:
      return { ...state, isFetching: true };
    case RECEIVE_ROUTE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        path: {
          ...action.path,
          points: action.path.points.coordinates.map(
            ([longitude, latitude]) => ({ longitude, latitude }),
          ),
        },
        stations: action.stations,
      };
    case RECEIVE_ROUTE_ERROR:
      return { ...state, isFetching: false, error: action.error };
    case SET_STATION:
      return { ...state, currentStation: action.number };
    default:
      return state;
  }
}

function form(state = {}, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return { ...state, ...action.data };
    default:
      return state;
  }
}

function location(state = { coords: {} }, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return { ...state, coords: action.coords };
    case LOCATION_PERMISSION_CHANGE:
      return { ...state, access: action.access };
    default:
      return state;
  }
}

const ceburiloApp = combineReducers({
  route,
  form,
  location,
});

export default ceburiloApp;
