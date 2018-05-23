import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { COLOR_WHITE } from '/app/config/styles';
import LocationInput from '/app/components/LocationInput';
import SearchButton from '/app/components/SearchButton';
import StartEndPrompt from '/app/components/StartEndPrompt';
import RouteMap from '/app/components/RouteMap';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
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
        <RouteMap
          onLongPress={({ nativeEvent: { coordinate } }) =>
            onChange({
              touchedLocation: coordsToLocation(coordinate),
            })
          }
          start={start}
          end={end}
          touchedLocation={touchedLocation}
        />
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
