import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import { COLOR_WHITE, COLOR_PRIMARY } from '/app/config/styles';
import RNGooglePlaces from 'react-native-google-places';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  form: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default class LocationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 52.237049,
        longitude: 21.017532,
        latitudeDelta: 0.1,
        longitudeDelta: 0.3,
      },
      start: null,
      end: null,
    };
  }

  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal();
    // .then(place => {
    // console.log(place, this);
    // place represents user's selection from the
    // suggestions and it is a simplified Google Place object.
    // });
    // .catch(error => console.log(error)); // error is a Javascript Error object
  };

  render() {
    const { region, start, end } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.openSearchModal()}
          >
            <Text>Open Place Picker</Text>
          </TouchableOpacity>
          <Button
            title="Znajdż trasę"
            color={COLOR_PRIMARY}
            onPress={() => {}}
          />
        </View>
        <MapView style={styles.map} initialRegion={region}>
          {start && <Marker coordinate={start} title="Start" />}
          {end && <Marker coordinate={end} title="Koniec" />}
        </MapView>
      </View>
    );
  }
}
