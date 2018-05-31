import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLOR_WHITE } from '/app/config/styles';
import logo from '/app/assets/logo.png';

const styles = StyleSheet.create({
  logo: {
    width: 22,
    margin: 10,
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 80,
  },
  headerText: {
    color: COLOR_WHITE,
    fontSize: 22,
  },
});

const HeaderTitle = () => (
  <View style={styles.headerTitle}>
    <Image source={logo} style={styles.logo} resizeMode="contain" />
    <Text style={styles.headerText}>Ceburilo</Text>
  </View>
);

export default HeaderTitle;
