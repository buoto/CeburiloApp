import { connect } from 'react-redux';

import RouteMap from '/app/components/RouteMap';

const mapStateToProps = ({
  form: { start, end },
  route: { stations, path },
}) => ({
  start,
  end,
  stations,
  path,
});

const mapDispatchToProps = () => ({});

const RouteResult = connect(mapStateToProps, mapDispatchToProps)(RouteMap);

export default RouteResult;
