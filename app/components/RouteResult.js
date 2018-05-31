import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { COLOR_PRIMARY } from '/app/config/styles';

import RouteMap from '/app/components/RouteMap';
import RouteDetails from '/app/components/RouteDetails';

const mapPadding = {
  top: 30,
  bottom: 10,
  left: 10,
  right: 10,
};

const navigateButtonSize = 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigateButton: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 20,
    zIndex: 100,
  },
});

const RouteResult = ({ navigation: { navigate }, ...props }) => (
  <View style={styles.container}>
    <RouteDetails {...props} />
    <RouteMap fitToElements mapPadding={mapPadding} {...props} />
    <View style={styles.navigateButton}>
      <Icon.Button
        size={navigateButtonSize}
        name="navigation"
        backgroundColor={COLOR_PRIMARY}
        onPress={() => navigate('Navigate')}
      >
        Nawiguj
      </Icon.Button>
    </View>
  </View>
);

RouteResult.defaultProps = {
  navigation: undefined,
};

RouteResult.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
};

export default RouteResult;
