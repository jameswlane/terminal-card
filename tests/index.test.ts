import src from '../src';

test('Output should match snapshot', () => {
  expect(src).toMatchSnapshot();
});
