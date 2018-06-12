import { connect } from 'react-redux';

import { fetchStationsIfNeeded } from '/app/actions';
import { defaultInitialRegion } from '/app/config/consts';

import Stations from '/app/components/Stations';

const mapStateToProps = ({
  stations: { data, isFetching },
  location: {
    coords: {
      latitude = defaultInitialRegion.latitude,
      longitude = defaultInitialRegion.longitude,
    },
  },
}) => ({
  stations: data,
  isFetching,
  region: {
    latitude,
    longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  },
});

const mapDispatchToProps = dispatch => ({
  refreshStations: () => dispatch(fetchStationsIfNeeded()),
});

const StationsMap = connect(mapStateToProps, mapDispatchToProps)(Stations);

export default StationsMap;
