import React from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

/* eslint-disable react-native/no-unused-styles */
const styles = StyleSheet.create({
  textInputContainer: {
    width: '100%',
  },
  predefinedPlacesDescription: {
    fontWeight: 'bold',
  },
});
/* eslint-enable react-native/no-unused-styles */

const PlacesAutocomplete = props => (
  <GooglePlacesAutocomplete
    minLength={2}
    fetchDetails
    returnKeyType="search"
    listViewDisplayed="true"
    currentLocation
    currentLocationLabel="Bieżąca lokalizacja"
    nearbyPlacesAPI="None"
    styles={styles}
    debounce={200}
    {...props}
  />
);
export default PlacesAutocomplete;
