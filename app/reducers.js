import { combineReducers } from 'redux';
import {
  REQUEST_ROUTE,
  RECEIVE_ROUTE_SUCCESS,
  RECEIVE_ROUTE_ERROR,
  REQUEST_STATIONS,
  RECEIVE_STATIONS_SUCCESS,
  RECEIVE_STATIONS_ERROR,
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
        stations: action.stations.map(
          ({ location: [latitude, longitude], name, number }) => ({
            location: { latitude, longitude },
            name,
            number,
          }),
        ),
      };
    case RECEIVE_ROUTE_ERROR:
      return { ...state, isFetching: false, error: action.error };
    case SET_STATION:
      console.log(action);
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

function stations(state = { isFetching: false, data: [] }, action) {
  switch (action.type) {
    case REQUEST_STATIONS:
      return { ...state, isFetching: true };
    case RECEIVE_STATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.stations,
      };
    case RECEIVE_STATIONS_ERROR:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}

const ceburiloApp = combineReducers({
  route,
  form,
  location,
  stations,
});

export default ceburiloApp;
