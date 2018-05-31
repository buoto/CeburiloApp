import { connect } from 'react-redux';

import { changeLocation } from '/app/actions';

import NavigateRoute from '/app/components/NavigateRoute';

const mapStateToProps = ({
  form: { start, end },
  route: { stations, path },
  location: { coords: { latitude, longitude, heading } },
}) => ({
  start,
  end,
  stations,
  path,
  userLocation: { latitude, longitude },
  userHeading: heading,
});

const mapDispatchToProps = dispatch => ({
  onUserLocationChange: coords => dispatch(changeLocation(coords)),
});

const Navigate = connect(mapStateToProps, mapDispatchToProps)(NavigateRoute);

export default Navigate;
