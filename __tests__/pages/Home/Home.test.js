import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import Home from "../../../shared/pages/home/Home";

describe("<Home />", () => {
  test("Home renders correctly", () => {
    const component = renderer.create(<Home />);
    const tree = component.toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div>
        <header
          className="shared-components-Header-style__header"
        >
          <span>
            BROCCOLI & CO.
          </span>
        </header>
        <div
          className="shared-components-Content-style__content"
        >
          <div
            className="shared-pages-home-style__home"
          >
            <p>
              A better way
              <br />
              to enjoy every day.
            </p>
            <p>
              Be the first to know when we launch.
            </p>
            <button
              className="shared-components-common-Button-style__button shared-pages-home-style__button "
              disabled={false}
              onClick={[Function]}
            >
              Request an invite
            </button>
          </div>
        </div>
        <footer
          className="shared-components-Footer-style__footer"
        >
          <div>
            <p>
              Made with ♥ in Melbourne.
            </p>
            <p>
              © 2019 Broccoli & Co. All rights reserved
            </p>
          </div>
        </footer>
      </div>
    `);
  });

  test('Home action', () => {
    const wrapper = mount(<Home />);
    expect(wrapper.find('Modal').length).toBe(0);
    // 点击 Request an invite 按钮
    wrapper.find('Button').simulate('click');
    expect(wrapper.find('Modal').length).toBe(1);
    expect(wrapper.find('.shared-pages-home-style__title').html()).toMatch(/Request an invite/);
    // mask关闭
    wrapper.find('Modal').find('.shared-components-common-Modal-style__mask').simulate('click');
    expect(wrapper.find('Modal').length).toBe(0);

    // 点击 Request an invite 按钮
    wrapper.find('Button').simulate('click');
    expect(wrapper.find('Modal').length).toBe(1);
    expect(wrapper.find('.shared-pages-home-style__title').html()).toMatch(/Request an invite/);
    // 登录成功
    wrapper.find('Modal').find('LoginBox').prop('onSuccess')();
    wrapper.update();
    expect(wrapper.find('.shared-pages-home-style__title').html()).toMatch(/All done/);
    expect(wrapper.find('Modal').length).toBe(1);
    // 点击OK关闭成功提示
    wrapper.find('Modal').find('LoginSuccessBox').prop('onCancel')();
    wrapper.update();
    expect(wrapper.find('Modal').length).toBe(0);

    // 登录成功
    wrapper.setState({
      showLoginSuccessBox: true,
    });
    expect(wrapper.find('.shared-pages-home-style__title').html()).toMatch(/All done/);
    // 点击mask关闭成功提示
    wrapper.find('Modal').prop('onCancel')();
    wrapper.update();
    expect(wrapper.find('Modal').length).toBe(0);

  });
});
