import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, InteractionManager } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

import ConditionalMarker from '/app/components/ConditionalMarker';
import { locationType } from '/app/models';
import { initialRegion } from '/app/config/consts';

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 0,
  },
});

class RouteMap extends React.Component {
  componentDidMount() {
    const { fitToElements } = this.props;
    if (this.mapView && fitToElements) {
      InteractionManager.runAfterInteractions(() => {
        this.mapView.fitToElements(true);
      });
    }
  }

  render() {
    const {
      start,
      end,
      touchedLocation,
      stations,
      path: { points },
      ...props
    } = this.props;
    return (
      <MapView
        ref={ref => {
          this.mapView = ref;
        }}
        style={styles.map}
        initialRegion={initialRegion}
        loadingEnabled
        {...props}
      >
        <ConditionalMarker
          coordinate={start}
          title="Start"
          pinColor="#00c853"
        />
        <ConditionalMarker coordinate={end} title="Koniec" pinColor="#ff3d00" />
        <ConditionalMarker
          coordinate={touchedLocation}
          title="Wybrana lokalizacja"
        />
        {stations.map(({ location: [latitude, longitude], name, number }) => (
          <Marker
            key={number}
            coordinate={{ longitude, latitude }}
            title={`${name} (${number})`}
            pinColor="#2979ff"
          />
        ))}
        {points && (
          <Polyline coordinates={points} strokeWidth={3} strokeColor="#00f" />
        )}
      </MapView>
    );
  }
}

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
  fitToElements: PropTypes.bool,
};

RouteMap.defaultProps = {
  start: undefined,
  end: undefined,
  touchedLocation: undefined,
  fitToElements: false,
  stations: [],
  path: {},
};

export default RouteMap;
