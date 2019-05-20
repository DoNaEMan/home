import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Modal from '../../../../shared/components/common/Modal';

describe('<Modal />', () => {
  test('Modal renders', () => {
    let isCancle = 0;
    const cancel = () => {
      isCancle ++;
    };
    const wrapper = mount(
      <Modal onCancel={cancel}>
        <div>I am fine</div>
      </Modal>
    );
    // expect(document.querySelector('.shared-components-common-Modal-style__maskBox').parentNode.nodeName).toBe('DIV');
    expect(wrapper.state().div).not.toBeNull();
    expect(wrapper.contains(<div>I am fine</div>)).toBe(true);
    wrapper.find('.shared-components-common-Modal-style__mask').simulate('click');
    expect(isCancle).toBe(1);
    wrapper.prop('onCancel')();
    expect(isCancle).toBe(2);
    const div = wrapper.state().div;
    wrapper.setState({ div: null });
    expect(wrapper.is('.shared-components-common-Modal-style__maskBox')).toBe(false);
    wrapper.setState({ div });
    wrapper.unmount();
  });

  test('Modal renders in node', () => {
    // 模拟node环境
    delete global.window;
    const wrapper = shallow(
      <Modal>
        <div>I am fine</div>
      </Modal>
    );
    expect(wrapper.state().div).toBeNull();
    expect(wrapper.isEmptyRender()).toBe(true);
    wrapper.unmount();
  });
});
