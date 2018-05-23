import { connect } from 'react-redux';

import { changeForm, fetchRouteIfNeeded } from '/app/actions';
import LocationForm from '/app/screens/LocationForm';

const mapStateToProps = ({
  form: { start, end, touchedLocation },
  route: { isFetching },
}) => ({
  start,
  end,
  touchedLocation,
  isFetching,
});

const mapDispatchToProps = dispatch => ({
  onChange: data => dispatch(changeForm(data)),
  onSubmit: (from, to) => dispatch(fetchRouteIfNeeded(from, to)),
});

const RouteForm = connect(mapStateToProps, mapDispatchToProps)(LocationForm);

export default RouteForm;
