import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { defaultInitialRegion } from '/app/config/consts';

import RouteMap from '/app/components/RouteMap';
import { locationType } from '/app/models';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class RouteResult extends React.Component {
  static defaultProps = {
    start: undefined,
    onUserLocationChange: () => {},
  };

  static propTypes = {
    start: locationType,
    onUserLocationChange: PropTypes.func,
  };
  componentDidMount() {
    const { onUserLocationChange } = this.props;
    this.watch = navigator.geolocation.watchPosition(({ coords }) =>
      onUserLocationChange(coords),
    ); // TODO handle error
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watch);
  }
  render() {
    const { start, ...props } = this.props;

    return (
      <View style={styles.container}>
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
          {...props}
        />
      </View>
    );
  }
}

export default RouteResult;
