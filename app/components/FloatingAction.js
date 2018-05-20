import { FloatingAction as FloatingActionBase } from 'react-native-floating-action';

export default class FloatingAction extends FloatingActionBase {
  constructor(props) {
    super(props);

    // super's reset is defined as an arrow function
    // thats why we are overriding it in such funny way
    const superReset = this.reset; // store super's reset implementation

    // overwrite reset with new implementation
    this.reset = () => {
      const { onReset = () => {} } = this.props;
      superReset();
      onReset();
    };
  }
}
