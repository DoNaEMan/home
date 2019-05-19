import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Input from '../../../../shared/components/common/Input';

describe('<Input />', () => {
  test('Input renders correctly', () => {
    const component = renderer.create(
      <Input type="text" name="name" className="style" defauleValue="123" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <input
        className="shared-components-common-Input-style__input style  "
        defauleValue="123"
        name="name"
        onChange={[Function]}
        type="text"
      />
    `);
  });

  test('Input disabled', () => {
    const wrapper = shallow(<Input disabled />);
    expect(wrapper.hasClass('shared-components-common-Input-style__disabled')).toBe(true);
  });

  test('Input error', () => {
    const wrapper = shallow(<Input error="wo cuo le" />);
    expect(wrapper.hasClass('shared-components-common-Input-style__error')).toBe(true);
  });

  test('Input onChange', () => {
    let _name = '';
    let _value = '';
    const wrapper = shallow(<Input name="name" onChange={(name, value) => { _name = name; _value = value; }} />);
    wrapper.simulate('change', { target: { value: '123' } });
    expect(_name).toBe('name');
    expect(_value).toBe('123');
  });
});
