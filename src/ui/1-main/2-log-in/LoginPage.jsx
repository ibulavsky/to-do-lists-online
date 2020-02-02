import React, {Component} from "react";
import {Button, Checkbox, Form, Icon, Input} from "antd"
import styles from './Login.module.css'
import {login} from "../../../bll/auth/Auth-thunks"
import {connect} from "react-redux"
import {compose} from "redux"

class LoginPage extends Component {


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.email, values.password, values.rememberMe)
            }
        });
    };

    render() {
        let {isAuth, loading} = this.props;

        const {getFieldDecorator} = this.props.form;
        return (<div className={styles.loginForm}>
                <div className={styles.title}>
                    Log In
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item className={styles.formItem}>
                        {getFieldDecorator('email', {
                            rules: [{
                                required: true,
                                message: 'Please input your email!'
                            }, {
                                pattern: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                                message: 'Please input correct email!'
                            }],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Email"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className={styles.formItem}>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className={styles.formItem}>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}


const WrappedNormalLoginForm = compose(
    Form.create({name: 'normal_login'}),
    connect(null, {login})
)(LoginPage);

export default WrappedNormalLoginForm
