import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLOR_WHITE } from '/app/config/styles';

const fontSize = 24;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: COLOR_WHITE,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize,
  },
});

const RouteDetails = ({ path: { time, distance }, stations }) => (
  <View style={styles.container}>
    <View style={styles.detail}>
      <Icon name="bicycle" size={fontSize} style={styles.getLocation} />
      <Text style={styles.detailText}>{(distance / 1000).toFixed(1)} km</Text>
    </View>
    <View style={styles.detail}>
      <Icon name="map-marker" size={fontSize} style={styles.getLocation} />
      <Text style={styles.detailText}>{stations.length}</Text>
    </View>
    <View style={styles.detail}>
      <Icon name="clock-o" size={fontSize} style={styles.getLocation} />
      <Text style={styles.detailText}>{parseInt(time / 60000, 10)} min</Text>
    </View>
  </View>
);

RouteDetails.propTypes = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({ location: PropTypes.arrayOf(PropTypes.number) }),
  ),
  path: PropTypes.shape({
    time: PropTypes.number,
    distance: PropTypes.number,
  }),
};

RouteDetails.defaultProps = {
  stations: [],
  path: {},
};

export default RouteDetails;
