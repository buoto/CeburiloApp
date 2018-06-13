import { connect } from 'react-redux';

import Stats from '/app/components/Stats';

const mapStateToProps = ({ completedRoutes }) => ({
  completedRoutes,
});

const CompletedStats = connect(mapStateToProps)(Stats);

export default CompletedStats;
