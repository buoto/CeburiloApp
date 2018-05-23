import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import MapView from 'react-native-maps';

import { COLOR_WHITE } from '/app/config/styles';
import { initialRegion } from '/app/config/consts';
import LocationInput from '/app/components/LocationInput';
import SearchButton from '/app/components/SearchButton';
import StartEndPrompt from '/app/components/StartEndPrompt';
import ConditionalMarker from '/app/components/ConditionalMarker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 0,
  },
});

const coordsToLocation = ({ latitude, longitude }) => ({
  latitude,
  longitude,
  name: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
});

const projectLocation = ({ name, latitude, longitude }) => ({
  name,
  latitude,
  longitude,
});

export default class LocationForm extends React.Component {
  static defaultProps = {
    start: undefined,
    end: undefined,
    touchedLocation: undefined,
    onChange: () => {},
    onSubmit: () => {},
    isFetching: false,
    navigation: undefined,
  };

  static propTypes = {
    start: PropTypes.shape({ name: PropTypes.string }),
    end: PropTypes.shape({ name: PropTypes.string }),
    touchedLocation: PropTypes.shape({ name: PropTypes.string }),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    isFetching: PropTypes.bool,
    navigation: PropTypes.shape({ navigate: PropTypes.func }),
  };

  componentDidUpdate({ isFetching: wasFetching }) {
    const { isFetching, navigation } = this.props;
    if (wasFetching && !isFetching) {
      navigation.navigate('Result');
    }
  }

  mapChangeLocation = ({ nativeEvent: { coordinate } }) => {
    this.props.onChange({ touchedLocation: coordsToLocation(coordinate) });
  };

  render() {
    const { start, end, touchedLocation, onChange, onSubmit } = this.props;

    const buttonVisible = start && end && !touchedLocation;

    return (
      <View style={styles.container}>
        <LocationInput
          placeholder="Start"
          location={start}
          onChange={location => onChange({ start: projectLocation(location) })}
        />
        <LocationInput
          placeholder="Cel"
          location={end}
          onChange={location => onChange({ end: projectLocation(location) })}
        />
        {buttonVisible && <SearchButton onPress={() => onSubmit(start, end)} />}
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onLongPress={this.mapChangeLocation}
        >
          <ConditionalMarker coordinate={start} title="Start" />
          <ConditionalMarker coordinate={end} title="Koniec" />
          <ConditionalMarker
            coordinate={touchedLocation}
            title="Wybrana lokalizacja"
          />
        </MapView>
        <StartEndPrompt
          visible={!!touchedLocation}
          onPress={name =>
            onChange({
              [name]: touchedLocation,
              touchedLocation: undefined,
            })
          }
          onReset={() => onChange({ touchedLocation: undefined })}
        />
      </View>
    );
  }
}
