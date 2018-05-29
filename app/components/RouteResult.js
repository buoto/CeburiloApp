import React from 'react';
import { StyleSheet, View } from 'react-native';

import RouteMap from '/app/components/RouteMap';
import RouteDetails from '/app/components/RouteDetails';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RouteResult = ({ ...props }) => (
  <View style={styles.container}>
    <RouteDetails {...props} />
    <RouteMap {...props} />
  </View>
);

export default RouteResult;
