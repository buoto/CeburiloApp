import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import { COLOR_WHITE, COLOR_PRIMARY } from '/app/config/styles';
import PlacesAutocomplete from '/app/components/PlacesAutocomplete';
import { GOOGLE_MAPS_API_KEY } from '/app/config/secrets';

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
  autocomplete: {
    flex: 0,
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
  render() {
    const { region, start, end } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <PlacesAutocomplete
            style={styles.autocomplete}
            placeholder="Start"
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: GOOGLE_MAPS_API_KEY,
              language: 'pl', // language of the results
              location: `${region.latitude},${region.longitude}`,
              radius: 100000,
              strictbounds: true,
            }}
            onPress={(
              result,
              { geometry: { location: { lat: latitude, lng: longitude } } },
            ) => {
              this.setState({
                ...this.state,
                start: { latitude, longitude },
              });
            }}
          />
          <PlacesAutocomplete
            placeholder="Cel"
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: GOOGLE_MAPS_API_KEY,
              language: 'pl', // language of the results
              location: `${region.latitude},${region.longitude}`,
              radius: 100000,
              strictbounds: true,
            }}
            onPress={(
              result,
              { geometry: { location: { lat: latitude, lng: longitude } } },
            ) => {
              this.setState({
                ...this.state,
                end: { latitude, longitude },
              });
            }}
          />
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
