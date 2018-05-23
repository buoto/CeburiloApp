import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';

import { COLOR_WHITE, COLOR_PRIMARY } from '/app/config/styles';
import FloatingAction from './FloatingAction';

const actions = [
  {
    text: 'Start',
    name: 'start',
    position: 1,
    icon: <Icon name="flag" color={COLOR_WHITE} />,
    color: COLOR_PRIMARY,
  },
  {
    text: 'Cel',
    name: 'end',
    position: 1,
    icon: <Icon name="flag-checkered" color={COLOR_WHITE} />,
    color: COLOR_PRIMARY,
  },
];

export default class StartEndPrompt extends React.Component {
  static defaultProps = {
    onPress: () => {},
    onReset: () => {},
    visible: false,
  };

  static propTypes = {
    onPress: PropTypes.func,
    onReset: PropTypes.func,
    visible: PropTypes.bool,
  };
  componentDidUpdate({ visible: wasVisible }) {
    const { visible, onPress } = this.props;
    if (visible && !wasVisible) {
      this.floatingAction.animateButton();
    } else if (wasVisible && !visible) {
      this.floatingAction.reset();
      onPress();
    }
  }

  render() {
    const { onPress, onReset } = this.props;
    return (
      <FloatingAction
        ref={ref => {
          this.floatingAction = ref;
        }}
        actions={actions}
        visible={false}
        onPressItem={onPress}
        onReset={onReset}
      />
    );
  }
}
