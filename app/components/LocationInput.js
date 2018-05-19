import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import RNGooglePlaces from 'react-native-google-places';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLOR_GREY, COLOR_GREY_DARK } from '/app/config/styles';
import { initialRegion } from '/app/config/consts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: COLOR_GREY,

    borderBottomColor: COLOR_GREY_DARK,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  location: {
    alignSelf: 'stretch',
    flex: 1,
    padding: 20,
  },
  locationText: {
    fontSize: 16,
  },
  currentLocation: {
    alignSelf: 'stretch',
    padding: 20,
  },
});

class LocationInput extends Component {
  static defaultProps = {
    placeholder: '',
    onChange: () => {},
    location: { name: '' },
  };

  static propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    location: PropTypes.shape({ name: PropTypes.string }),
  };

  getCurrentLocation = () => {
    const { onChange } = this.props;
    RNGooglePlaces.getCurrentPlace().then(([place]) => onChange(place));
    // .catch(error => console.log(error)); TODO handle error
  };
  openSearchModal = () => {
    const { onChange } = this.props;
    RNGooglePlaces.openAutocompleteModal(initialRegion).then(place => {
      onChange(place);
    });
    // .catch(error => console.log(error)); TODO handle error
  };

  render() {
    const { placeholder, location: { name } } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.location}
          onPress={this.openSearchModal}
        >
          <Text style={styles.locationText}>{name || placeholder}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.currentLocation}
          onPress={this.getCurrentLocation}
        >
          <Icon name="crosshairs" size={20} style={styles.getLocation} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default LocationInput;
