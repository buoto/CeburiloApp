import { connect } from 'react-redux';

import {
  changeForm,
  fetchRouteIfNeeded,
  requestLocationPermission,
} from '/app/actions';
import LocationForm from '/app/components/LocationForm';

const mapStateToProps = ({
  form: { start, end, touchedLocation },
  route: { isFetching },
  locationAccess,
}) => ({
  start,
  end,
  touchedLocation,
  isFetching,
  locationAccess,
});

const mapDispatchToProps = dispatch => ({
  onChange: data => dispatch(changeForm(data)),
  onSubmit: (from, to) => dispatch(fetchRouteIfNeeded(from, to)),
  requestPermission: () => dispatch(requestLocationPermission()),
});

const RouteForm = connect(mapStateToProps, mapDispatchToProps)(LocationForm);

export default RouteForm;
