import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from '../../../../shared/components/common/Button';

describe('<Button />', () => {
  test('Button renders correctly', () => {
    const component = renderer.create(
      <Button className="custom-style">Ok</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchInlineSnapshot(`
    <button
      className="shared-components-common-Button-style__button custom-style "
      disabled={false}
    >
      Ok
    </button>
  `);
  });

  test('Button disabled', () => {
    const wrapper = shallow(<Button disabled>Ok</Button>);
    expect(wrapper.hasClass('shared-components-common-Button-style__disabled')).toBe(true);
  });

  test('Button loading', () => {
    const component = renderer.create(<Button loading>Ok</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchInlineSnapshot(`
    <button
      className="shared-components-common-Button-style__button  shared-components-common-Button-style__disabled"
      disabled={true}
    >
      Ok
      <span
        className="shared-components-common-Button-style__buttonLoading"
      />
    </button>
  `);
  });
});