import React from 'react';
import { StyleSheet, View } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { COLOR_WHITE } from '/app/config/styles';

export default class StationsMap extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 52.237049,
        longitude: 21.017532,
        latitudeDelta: 0.1,
        longitudeDelta: 0.3,
      },
    };
  }
  render() {
    const { region } = this.state;

    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={region}>
          <Marker coordinate={region} title={'Warszawa'} />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
