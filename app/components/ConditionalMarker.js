import React from 'react';
import { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';

const ConditionalMarker = ({ coordinate, ...props }) =>
  coordinate && <Marker coordinate={coordinate} {...props} />;

ConditionalMarker.propTypes = {
  coordinate: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};

ConditionalMarker.defaultProps = {
  coordinate: null,
};

export default ConditionalMarker;
