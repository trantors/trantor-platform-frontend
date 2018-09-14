/* eslint react/no-string-refs:0 */
import React, { Component } from 'react'
import keydown, { Keys } from 'react-keydown'
import { Link } from 'react-router-dom'
import { Input, Button, Checkbox, Grid } from '@icedesign/base'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from '@icedesign/form-binder'
import IceIcon from '@icedesign/icon'

import { connect } from 'react-redux'
import { compose } from 'redux'
import injectReducer from '../../utils/injectReducer'
import { userLogin } from './actions'
import reducer from './reducer'

const { ENTER } = Keys
const { Row, Col } = Grid

class UserLogin extends Component {
  static displayName = 'UserLogin'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      value: {
        client: '001',
        username: 'honey',
        password: 'xs',
        checkbox: false
      }
    }
  }

  // @autobind
  handleKeyPress = (event, next) => {
    if (event.key === 'Enter') {
      console.log(event, this.refs)
      this.refs[next].refs.input.focus()
    }
  }

  formChange = (value) => {
    this.setState({
      value
    })
  }

  formKeyPress = (event) => {
    console.log(event, event.key)
    if (event.key == 'Enter') {
      let e = new Event('keyPress')
      e.key = 'Tab'
      // e.target = event.target
      event.target.dispatchEvent(e)
    }
  }

  @keydown(ENTER)
  handleXX(event) {
    console.log(event)
  }

  handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors)
        return
      }
      this.props.userLogin(values)
    })
  }

  render() {
    return (
      <div className="user-login">
        <div className="formContainer">
          <h4 className="formTitle">系 统 登 录</h4>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            // onKeyPress={this.formKeyPress}
            ref="form"
          >
            <div className="formItems">
              <Row className="formItem">
                <Col className="formItemCol">
                  客户编码：
                  {/* <IceIcon type="home" size="small" className="inputIcon" /> */}
                  <IceFormBinder name="client" required message="必填">
                    <Input
                      addonAfter="个"
                      size="small"
                      maxLength={20}
                      hasLimitHint
                      placeholder="客户编码"
                      ref="client"
                      onKeyPress={(e) => this.handleKeyPress(e, 'username')}
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="client" />
                </Col>
              </Row>
              <Row className="formItem">
                <Col className="formItemCol">
                  <IceIcon type="person" size="small" className="inputIcon" />
                  <IceFormBinder name="username" required message="必填">
                    <Input
                      size="large"
                      maxLength={20}
                      placeholder="用户名"
                      ref="username"
                      onKeyPress={(e) => this.handleKeyPress(e, 'password')}
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="username" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col className="formItemCol">
                  <IceIcon type="lock" size="small" className="inputIcon" />
                  <IceFormBinder name="password" required message="必填">
                    <Input
                      size="large"
                      htmlType="password"
                      placeholder="密码"
                      ref="password"
                      // onKeyPress={(e) => this.handleKeyPress(e, 'btn.submit')}
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="password" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col>
                  <IceFormBinder name="checkbox">
                    <Checkbox className="checkbox">记住账号</Checkbox>
                  </IceFormBinder>
                </Col>
              </Row>

              <Row className="formItem">
                <Button type="primary" onClick={this.handleSubmit} className="submitBtn" ref="btn.submit">
                  登 录
                </Button>
                <p className="account">
                  <span className="tips-text" style={{ marginRight: '20px' }}>
                    管理员登录：admin/admin
                  </span>
                  <span className="tips-text">用户登录：user/user</span>
                </p>
              </Row>

              <Row className="tips">
                <Link to="/user/register" className="tips-text">
                  立即注册
                </Link>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  userLogin
}

const mapStateToProps = (state) => {
  return { loginResult: state.login }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'login', reducer })

export default compose(withReducer, withConnect)(UserLogin)
