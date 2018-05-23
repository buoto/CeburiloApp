import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

import { initialRegion } from '/app/config/consts';
import ConditionalMarker from '/app/components/ConditionalMarker';

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 0,
  },
});
const RouteMap = ({
  start,
  end,
  touchedLocation,
  stations,
  path: { points },
  ...props
}) => (
  <MapView initialRegion={initialRegion} style={styles.map} {...props}>
    <ConditionalMarker coordinate={start} title="Start" />
    <ConditionalMarker coordinate={end} title="Koniec" />
    <ConditionalMarker
      coordinate={touchedLocation}
      title="Wybrana lokalizacja"
    />
    {stations.map(({ location: [latitude, longitude], name, number }) => (
      <Marker
        key={number}
        coordinate={{ longitude, latitude }}
        title={`${name} (${number})`}
      />
    ))}
    {points && (
      <Polyline coordinates={points} strokeWidth={3} strokeColor="#00f" />
    )}
  </MapView>
);

const locationType = PropTypes.shape({
  name: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
});

RouteMap.propTypes = {
  start: locationType,
  end: locationType,
  touchedLocation: locationType,
  stations: PropTypes.arrayOf(
    PropTypes.shape({ location: PropTypes.arrayOf(PropTypes.number) }),
  ),
  path: PropTypes.shape({
    points: PropTypes.arrayOf(
      PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
    ),
  }),
};

RouteMap.defaultProps = {
  start: undefined,
  end: undefined,
  touchedLocation: undefined,
  stations: [],
  path: {},
};

export default RouteMap;
