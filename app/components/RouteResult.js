import React from 'react';
import { StyleSheet, View } from 'react-native';

import RouteMap from '/app/components/RouteMap';
import RouteDetails from '/app/components/RouteDetails';

const mapPadding = {
  top: 30,
  bottom: 10,
  left: 10,
  right: 10,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RouteResult = ({ ...props }) => (
  <View style={styles.container}>
    <RouteDetails {...props} />
    <RouteMap fitToElements mapPadding={mapPadding} {...props} />
  </View>
);

export default RouteResult;
