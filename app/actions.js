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
export const CHANGE_FORM = 'CHANGE_FORM';

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

export const changeForm = makeActionCreator(CHANGE_FORM, 'data');
