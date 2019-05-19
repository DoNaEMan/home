import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import LoginBox from '../../../shared/pages/home/LoginBox';

describe('<LoginBox />', () => {
  test('LoginBox renders correctly', () => {
    const component = renderer.create(<LoginBox />);
    const tree = component.toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="shared-pages-home-style__login"
      >
        <p
          className="shared-pages-home-style__title"
        >
          Request an invite
        </p>
        <div
          className="shared-pages-home-style__hr"
        />
        <div
          className="shared-pages-home-style__formItem"
        >
          <input
            className="shared-components-common-Input-style__input   "
            name="name"
            onChange={[Function]}
            placeholder="Full name"
            type="text"
          />
        </div>
        <div
          className="shared-pages-home-style__formItem"
        >
          <input
            className="shared-components-common-Input-style__input   "
            name="email"
            onChange={[Function]}
            placeholder="Email"
            type="email"
          />
        </div>
        <div
          className="shared-pages-home-style__formItem"
        >
          <input
            className="shared-components-common-Input-style__input   "
            name="email2"
            onChange={[Function]}
            placeholder="Confirm email"
            type="email"
          />
        </div>
        <div
          className="shared-pages-home-style__formItem shared-pages-home-style__button"
        >
          <button
            className="shared-components-common-Button-style__button  "
            disabled={false}
            onClick={[Function]}
          >
            Send
          </button>
        </div>
        <p
          className="shared-pages-home-style__errorBox"
        >
          
        </p>
      </div>
    `);
  });

  test('LoginBox', async () => {
    jest.mock('../../../__mocks__/axios');

    let isSuccess = false;
    const wrapper = mount(<LoginBox onSuccess={() => { isSuccess = true; }} />);

    // name
    expect(wrapper.find('Input').at(0).prop('name')).toBe('name');
    wrapper.find('Input').at(0).simulate('change', { target: { value: '12 ' } });
    expect(wrapper.state('values').name).toBe('12');

    // email
    expect(wrapper.find('Input').at(1).prop('name')).toBe('email');
    wrapper.find('Input').at(1).simulate('change', { target: { value: ' 123@ ' } });
    expect(wrapper.state('values').email).toBe('123@');

    // email confirm
    expect(wrapper.find('Input').at(2).prop('name')).toBe('email2');
    wrapper.find('Input').at(2).simulate('change', { target: { value: ' 123@' } });
    expect(wrapper.state('values').email2).toBe('123@');

    // 登录校验
    wrapper.find('Button').at(0).simulate('click');
    expect(wrapper.find('Input').at(0).prop('error')).not.toBe('');
    expect(wrapper.find('Input').at(1).prop('error')).not.toBe('');
    expect(wrapper.find('Input').at(2).prop('error')).not.toBe('');

    // 输入正确的值
    wrapper.find('Input').at(0).simulate('change', { target: { value: '123 ' } });
    wrapper.find('Input').at(1).simulate('change', { target: { value: ' 123@cm.cc ' } });
    wrapper.find('Input').at(2).simulate('change', { target: { value: ' 123@cm.cc' } });
    expect(wrapper.find('Input').at(0).prop('error')).toBe('');
    expect(wrapper.find('Input').at(1).prop('error')).toBe('');
    expect(wrapper.find('Input').at(2).prop('error')).toBe('');

    // 登录请求
    await wrapper.find('Button').at(0).prop('onClick')();
    expect(wrapper.state('sendTouched')).toBe(true);
    expect(wrapper.state('loading')).toBe(false);
    expect(wrapper.find('Button').at(0).prop('loading')).toBe(false);
    expect(isSuccess).toBe(true);
    isSuccess = false;

    // 空值
    wrapper.find('Input').at(0).simulate('change', { target: { value: ' ' } });
    wrapper.find('Input').at(1).simulate('change', { target: { value: '' } });
    wrapper.find('Input').at(2).simulate('change', { target: { value: '' } });
    expect(wrapper.find('Input').at(0).prop('error')).not.toBe('');
    expect(wrapper.find('Input').at(1).prop('error')).not.toBe('');
    expect(wrapper.find('Input').at(2).prop('error')).not.toBe('');

    // 输入特殊email
    wrapper.find('Input').at(0).simulate('change', { target: { value: '123 ' } });
    wrapper.find('Input').at(1).simulate('change', { target: { value: ' usedemail@airwallex.com ' } });
    wrapper.find('Input').at(2).simulate('change', { target: { value: ' usedemail@airwallex.com' } });
    await wrapper.find('Button').at(0).prop('onClick')();
    expect(wrapper.find('Button').at(0).prop('loading')).toBe(false);
    expect(wrapper.state('error').responseError).toBe('Bad Request: Email is already in use');
    expect(isSuccess).toBe(false);

    // 输入特殊name 跑返回值格式错误
    wrapper.find('Input').at(0).simulate('change', { target: { value: 'dataFormatError' } });
    wrapper.find('Input').at(1).simulate('change', { target: { value: ' usedemail@airwallex.com ' } });
    wrapper.find('Input').at(2).simulate('change', { target: { value: ' usedemail@airwallex.com' } });
    await wrapper.find('Button').at(0).prop('onClick')();
    expect(wrapper.state('error').responseError).toBe('system error');

    wrapper.find('Input').at(0).simulate('change', { target: { value: 'dataFormatError' } });
    wrapper.find('Input').at(1).simulate('change', { target: { value: ' usedemail@airwallex.co ' } });
    wrapper.find('Input').at(2).simulate('change', { target: { value: ' usedemail@airwallex.co' } });
    await wrapper.find('Button').at(0).prop('onClick')();
    expect(wrapper.state('error').responseError).toBe('system error');
  });
});
