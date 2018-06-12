import queryString from 'query-string';

function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]; // TODO change to arg
    });
    return action;
  };
}

export const REQUEST_ROUTE = 'REQUEST_ROUTE';
export const RECEIVE_ROUTE_SUCCESS = 'RECEIVE_ROUTE_SUCCESS';
export const RECEIVE_ROUTE_ERROR = 'RECEIVE_ROUTE_ERROR';

export const REQUEST_STATIONS = 'REQUEST_STATIONS';
export const RECEIVE_STATIONS_SUCCESS = 'RECEIVE_STATIONS_SUCCESS';
export const RECEIVE_STATIONS_ERROR = 'RECEIVE_STATIONS_ERROR';

export const CHANGE_FORM = 'CHANGE_FORM';
export const LOCATION_PERMISSION_CHANGE = 'LOCATION_PERMISSION_CHANGE';
export const LOCATION_CHANGE = 'LOCATION_CHANGE';
export const SET_STATION = 'SET_STATION';

const requestRoute = makeActionCreator(REQUEST_ROUTE, 'from', 'to');
const receiveRouteSuccess = makeActionCreator(
  RECEIVE_ROUTE_SUCCESS,
  'path',
  'stations',
);
const receiveRouteError = makeActionCreator(RECEIVE_ROUTE_ERROR, 'error');

function fetchRoute(from, to) {
  return dispatch => {
    dispatch(requestRoute(from, to));

    const params = {
      beg_lat: from.latitude,
      beg_lon: from.longitude,
      dest_lat: to.latitude,
      dest_lon: to.longitude,
    };
    fetch(`https://api.ceburilo.pl/route?${queryString.stringify(params)}`)
      .then(response => response.json())
      .then(({ path, stations }) =>
        dispatch(receiveRouteSuccess(path, stations)),
      )
      .catch(error => dispatch(receiveRouteError(error)));
  };
}

export function fetchRouteIfNeeded(from, to) {
  return (dispatch, getState) => {
    if (getState().route.isFetching) {
      return Promise.resolve();
    }
    return dispatch(fetchRoute(from, to));
  };
}

const requestStations = makeActionCreator(REQUEST_STATIONS);
const receiveStationsSuccess = makeActionCreator(
  RECEIVE_STATIONS_SUCCESS,
  'stations',
);
const receiveStationsError = makeActionCreator(RECEIVE_STATIONS_ERROR, 'error');

const projectNextbikeStations = ({
  lat,
  lng,
  name,
  number,
  maintenance,
  bikes,
  bike_list, // eslint-disable-line
}) => ({
  location: {
    latitude: lat,
    longitude: lng,
  },
  name,
  number,
  maintenance,
  bikeCount: bikes,
  bikes: bike_list,
});

function fetchStations() {
  return dispatch => {
    dispatch(requestStations());

    fetch('http://api.nextbike.net/maps/nextbike-official.json?city=210')
      .then(response => response.json())
      .then(({ countries: [{ cities: [{ places }] }] }) =>
        dispatch(receiveStationsSuccess(places.map(projectNextbikeStations))),
      )
      .catch(error => dispatch(receiveStationsError(error)));
  };
}

export function fetchStationsIfNeeded() {
  return (dispatch, getState) => {
    if (getState().stations.isFetching) {
      return Promise.resolve();
    }
    return dispatch(fetchStations());
  };
}
const { PermissionsAndroid } = require('react-native'); // TODO ios

export const changeLocationPermission = makeActionCreator(
  LOCATION_PERMISSION_CHANGE,
  'access',
);

export function requestLocationPermission() {
  return dispatch =>
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Ceburilo prosi o dostęp do lokalizacji',
        message:
          'Aby pobieranie bieżącej lokalizacji działało poprawnie ' +
          'potrzebna jest twoja zgoda.',
      },
    ).then(
      granted =>
        granted === PermissionsAndroid.RESULTS.GRANTED &&
        dispatch(changeLocationPermission(true)),
    );
}

export function checkLocationPermission() {
  return dispatch =>
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(granted => dispatch(changeLocationPermission(granted)));
}

export const changeForm = makeActionCreator(CHANGE_FORM, 'data');

export const changeLocation = makeActionCreator(LOCATION_CHANGE, 'coords');

export const setStation = makeActionCreator(SET_STATION, 'number');
