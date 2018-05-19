import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import { COLOR_WHITE, COLOR_PRIMARY } from '/app/config/styles';
import { initialRegion } from '/app/config/consts';
import LocationInput from '/app/components/LocationInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  form: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputs: {
    alignSelf: 'stretch',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
  searchButton: {
    position: 'absolute',
    bottom: -25,
  },
});

export default class LocationForm extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { start, end } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <LocationInput
              placeholder="Start"
              location={start}
              onChange={location => {
                this.setState({ start: location });
              }}
            />
            <LocationInput
              placeholder="Cel"
              location={end}
              onChange={location => {
                this.setState({ end: location });
              }}
            />
          </View>
          <View style={styles.searchButton}>
            <Button
              title="Znajdż trasę"
              color={COLOR_PRIMARY}
              onPress={() => {}}
            />
          </View>
        </View>
        <MapView style={styles.map} initialRegion={initialRegion}>
          {start && <Marker coordinate={start} title="Start" />}
          {end && <Marker coordinate={end} title="Koniec" />}
        </MapView>
      </View>
    );
  }
}
