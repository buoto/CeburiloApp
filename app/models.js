import PropTypes from 'prop-types';

export const coordinateType = PropTypes.shape({
  latitude: PropTypes.number,
  longitude: PropTypes.number,
});

export const locationType = PropTypes.shape({
  name: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
});

export const regionType = PropTypes.shape({
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  latitudeDelta: PropTypes.number,
  longitudeDelta: PropTypes.number,
  radius: PropTypes.number,
  country: PropTypes.string,
});
