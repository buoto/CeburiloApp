import { connect } from 'react-redux';

import { changeLocation, setStation } from '/app/actions';

import NavigateRoute from '/app/components/NavigateRoute';

const mapStateToProps = ({
  form: { start, end },
  route: { stations, path, currentStation },
  location: { coords: { latitude, longitude, heading } },
}) => ({
  start,
  end,
  stations,
  path,
  userLocation: { latitude, longitude },
  userHeading: heading,
  currentStation,
});

const mapDispatchToProps = dispatch => ({
  onUserLocationChange: coords => dispatch(changeLocation(coords)),
  setStation: currentStation => dispatch(setStation(currentStation)),
});

const Navigate = connect(mapStateToProps, mapDispatchToProps)(NavigateRoute);

export default Navigate;
