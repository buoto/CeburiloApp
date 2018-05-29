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
