import React from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { COLOR_WHITE, COLOR_PRIMARY } from '/app/config/styles';

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
    };
  }
  render() {
    const { region } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput placeholder="Od" style={styles.addressInput} />
          <TextInput placeholder="Do" style={styles.addressInput} />
          <Button
            title="Znajdż trasę"
            color={COLOR_PRIMARY}
            onPress={() => {}}
          />
        </View>
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
  form: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  addressInput: {
    alignSelf: 'stretch',
    margin: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
