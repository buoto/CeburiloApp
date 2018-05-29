import { connect } from 'react-redux';

import RouteResult from '/app/components/RouteResult';

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

const Result = connect(mapStateToProps, mapDispatchToProps)(RouteResult);

export default Result;
