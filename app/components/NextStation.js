import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Button } from 'react-native';

import {
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_SECONDARY_DARK,
} from '/app/config/styles';

const fontSize = 20;

const styles = StyleSheet.create({
  stationLabel: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_WHITE,
  },
  detailText: {
    marginLeft: 5,
    fontSize,
  },
  nextButton: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    top: 60,
    zIndex: 100,
  },
});

class NextStation extends React.Component {
  componentWillUnmount() {
    const { setStation } = this.props;
    setStation(undefined);
  }

  render() {
    const { stations, currentStation, setStation } = this.props;
    const nextAvailable = currentStation < stations.length;

    return (
      <View>
        <View style={styles.stationLabel}>
          <Text style={styles.detailText}>
            {currentStation < stations.length
              ? stations[currentStation].name
              : 'Twój cel'}
          </Text>
        </View>
        <View style={styles.nextButton}>
          {nextAvailable ? (
            <Button
              style={styles.nextButton}
              color={COLOR_PRIMARY}
              title="Następna stacja"
              onPress={() => setStation(currentStation + 1)}
            />
          ) : (
            <Button
              style={styles.nextButton}
              color={COLOR_SECONDARY_DARK}
              title="Zakończ nawigację"
              onPress={() => {}}
            />
          )}
        </View>
      </View>
    );
  }
}

NextStation.propTypes = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      location: PropTypes.arrayOf(PropTypes.number),
    }),
  ),
  currentStation: PropTypes.number,
  setStation: PropTypes.func,
};

NextStation.defaultProps = {
  stations: [],
  currentStation: 0,
  setStation: () => {},
};

export default NextStation;
