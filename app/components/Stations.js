import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RouteMap from '/app/components/RouteMap';
import { COLOR_PRIMARY } from '/app/config/styles';
import { regionType } from '/app/models';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchButton: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 50,
    zIndex: 100,
  },
});

const Stations = ({ stations, refreshStations, isFetching, region }) => (
  <View style={styles.container}>
    <RouteMap initialRegion={region} stations={stations} />
    <View style={styles.searchButton}>
      {isFetching && <ActivityIndicator size="large" />}
      <Icon.Button
        name="refresh"
        backgroundColor={COLOR_PRIMARY}
        onPress={refreshStations}
        disabled={isFetching}
      >
        Odśwież
      </Icon.Button>
    </View>
  </View>
);

Stations.propTypes = {
  refreshStations: PropTypes.func,
  region: regionType,
  isFetching: PropTypes.bool,
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
    }),
  ),
};

Stations.defaultProps = {
  refreshStations: () => {},
  isFetching: false,
  stations: [],
  region: undefined,
};

export default Stations;
