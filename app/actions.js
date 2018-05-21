function makeActionCreator(type, ...argNames) {
  return function(...args) {
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
export const SET_START = 'SET_START';
export const SET_END = 'SET_END';

export const requestRoute = makeActionCreator(REQUEST_ROUTE, 'from', 'to');
export const receiveRouteSuccess = makeActionCreator(
  RECEIVE_ROUTE_SUCCESS,
  'route',
);
export const receiveRouteError = makeActionCreator(
  RECEIVE_ROUTE_ERROR,
  'route',
);
export const setStart = makeActionCreator(SET_START, 'start');
export const setEnd = makeActionCreator(SET_END, 'end');
