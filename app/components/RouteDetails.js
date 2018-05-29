import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

import { initialRegion } from '/app/config/consts';
import RouteMap from '/app/components/RouteMap';
import { locationType } from '/app/models';

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 0,
  },
});

const RouteMap = ({ ...props }) => <RouteMap {...props} />;

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
