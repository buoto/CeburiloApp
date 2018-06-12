import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { defaultInitialRegion } from '/app/config/consts';

import RouteMap from '/app/components/RouteMap';
import NextStation from '/app/components/NextStation';
import { locationType } from '/app/models';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class NavigateRoute extends React.Component {
  static defaultProps = {
    start: undefined,
    onUserLocationChange: () => {},
    setStation: () => {},
    path: undefined,
    completeRoute: () => {},
    navigation: {},
    stations: [],
  };

  static propTypes = {
    start: locationType,
    onUserLocationChange: PropTypes.func,
    setStation: PropTypes.func,
    stations: PropTypes.arrayOf(
      PropTypes.shape({
        location: PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      }),
    ),
    path: PropTypes.shape({
      points: PropTypes.arrayOf(
        PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      ),
    }),
    completeRoute: PropTypes.func,
    navigation: PropTypes.shape({ navigate: PropTypes.func }),
  };

  componentDidMount() {
    const { onUserLocationChange, setStation } = this.props;
    this.watch = navigator.geolocation.watchPosition(
      ({ coords }) =>
        coords.latitude && coords.longitude && onUserLocationChange(coords),
    ); // TODO handle error
    setStation(0);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watch);
  }
  completeRoute = () => {
    const {
      path,
      stations,
      completeRoute,
      navigation: { navigate },
    } = this.props;

    completeRoute(path, stations);
    navigate('Trasy');
  };
  render() {
    const { start, ...props } = this.props;

    return (
      <View style={styles.container}>
        <NextStation {...props} completeRoute={this.completeRoute} />
        <RouteMap
          showsUserLocation
          followsUserLocation
          zoomControlEnabled
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          initialRegion={{
            ...defaultInitialRegion,
            ...start,
            latitudeDelta: 0.005,
            longitudeDelta: 0.015,
          }}
          provider="google"
          start={start}
          {...props}
        />
      </View>
    );
  }
}

export default NavigateRoute;
