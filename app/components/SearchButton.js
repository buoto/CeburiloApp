import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import PropTypes from 'prop-types';

import { COLOR_PRIMARY } from '/app/config/styles';

const styles = StyleSheet.create({
  searchButton: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    zIndex: 100,
  },
});

const SearchButton = ({ onPress }) => (
  <View>
    <View style={styles.searchButton}>
      <Button title="Znajdż trasę" color={COLOR_PRIMARY} onPress={onPress} />
    </View>
  </View>
);
SearchButton.propTypes = {
  onPress: PropTypes.func,
};

SearchButton.defaultProps = {
  onPress: () => {},
};

export default SearchButton;
