import React from 'react';
import {
  Form, Icon, Input, Button,
} from 'antd';
import './Login.css';
  
class Signup extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.auth.signup(values);
      }
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;

    return (
      <div className="app-auth-login">
        <Form
          className="app-auth-login__form"
          onSubmit={this.handleSubmit}
        >
          <Form.Item className="app-auth-login__form-item">
            {
              getFieldDecorator(
                'userName',
                { rules: [{ required: true, message: 'Please input your email!' }] },
              )(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="email"
                />
              )
            }
          </Form.Item>
          <Form.Item className="app-auth-login__form-item">
            {
              getFieldDecorator(
                'password',
                { rules: [{ required: true, message: 'Please input your Password!' }] },
              )(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )
            }
          </Form.Item>
          <Form.Item className="app-auth-login__form-item">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const NormalSignup = Form.create({ name: 'normal_signup' })(Signup);

export default NormalSignup;