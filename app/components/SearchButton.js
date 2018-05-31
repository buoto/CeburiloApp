import React from 'react';
import { StyleSheet, View, Button, ActivityIndicator } from 'react-native';
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

const SearchButton = ({ onPress, isFetching }) => (
  <View>
    <View style={styles.searchButton}>
      <Button
        title="Znajdź trasę"
        color={COLOR_PRIMARY}
        onPress={onPress}
        disabled={isFetching}
      />
      {isFetching && <ActivityIndicator size="large" />}
    </View>
  </View>
);

SearchButton.propTypes = {
  onPress: PropTypes.func,
  isFetching: PropTypes.bool,
};

SearchButton.defaultProps = {
  onPress: () => {},
  isFetching: false,
};

export default SearchButton;
