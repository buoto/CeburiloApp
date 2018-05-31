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
  location: { access },
}) => ({
  start,
  end,
  touchedLocation,
  isFetching,
  locationAccess: access,
});

const mapDispatchToProps = dispatch => ({
  onChange: data => dispatch(changeForm(data)),
  onSubmit: (from, to) => dispatch(fetchRouteIfNeeded(from, to)),
  requestPermission: () => dispatch(requestLocationPermission()),
});

const Form = connect(mapStateToProps, mapDispatchToProps)(LocationForm);

export default Form;
