import React from 'react';
import renderer from 'react-test-renderer';

import Foo from './Foo';

it('renders without crashing', () => {
  const rendered = renderer.create(<Foo />).toJSON();
  expect(rendered).toBeTruthy();
});
