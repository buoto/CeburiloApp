import React from 'react';
import { Marker } from 'react-native-maps';

import { coordinateType } from '/app/models';

const ConditionalMarker = ({ coordinate, ...props }) =>
  coordinate && <Marker coordinate={coordinate} {...props} />;

ConditionalMarker.propTypes = {
  coordinate: coordinateType,
};

ConditionalMarker.defaultProps = {
  coordinate: null,
};

export default ConditionalMarker;
