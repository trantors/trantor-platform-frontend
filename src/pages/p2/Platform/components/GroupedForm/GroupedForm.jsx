import React, { Component } from 'react'
import IceContainer from '@icedesign/container'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from '@icedesign/form-binder'
import { Input, Button, Select, Checkbox, Grid, Badge } from '@icedesign/base'

const { Row, Col } = Grid
const CheckboxGroup = Checkbox.Group

export default class GroupedForm extends Component {
  static displayName = 'GroupedForm'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      value: {
        material_no: '000987',
        material_name: '',
        desc: '',
        type: '',
        deliveryType: '',
        deliveryFee: ''
      }
    }
    this.formSchema = {
      title: '物料主数据',
      type: 'object',
      fields: [
        {
          name: 'material_no',
          label: '物料编码',
          placeholder: '请输入物料编码',
          message: '物料编码是必输项',
          required: true,
          type: 'string',
          ui: 'input'
        },
        {
          name: 'material_name',
          label: '物料名称',
          placeholder: '请输入物料名称',
          message: '物料名称是必输项',
          required: false,
          type: 'string',
          ui: 'input'
        }
      ]
    }
  }

  formBuilder = (schema) => {
    let fields = schema.fields.map((x) => {
      return (
        <Row style={styles.formItem}>
          <Col xxs="8" s="3" l="3" style={styles.formLabel}>
            {x.label}：
          </Col>
          <Col s="12" l="10">
            <IceFormBinder name={x.name}>
              <Input
                size="large"
                required={x.required}
                placeholder={x.placeholder}
                message={x.message}
                style={{ width: '100%' }}
              />
            </IceFormBinder>
            <IceFormError name={x.name} />
          </Col>
        </Row>
      )
    })
    console.log(fields)
    return fields
  }

  onFormChange = (value) => {
    this.setState({
      value
    })
  }

  reset = () => {
    this.setState({
      value: {
        title: '',
        price: '',
        desc: '',
        type: '',
        deliveryType: '',
        deliveryFee: ''
      }
    })
  }

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value)
      if (error) {
        // 处理表单报错
      }
      // 提交当前填写的数据
    })
  }

  render() {
    return (
      <div className="grouped-form">
        <IceContainer title={this.formSchema.title} style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>
              {this.formSchema.fields.map((x) => (
                <Row style={styles.formItem}>
                  <Col xxs="8" s="3" l="3" style={styles.formLabel}>
                    {x.label}：
                  </Col>
                  <Col s="12" l="10">
                    <IceFormBinder name={x.name}>
                      <Input
                        size="large"
                        // multiple
                        // rows={3}
                        required={x.required}
                        placeholder={x.placeholder}
                        message={x.message}
                        style={{ width: '100%', borderRadius: '0px' }}
                      />
                    </IceFormBinder>
                    <IceFormError name={x.name} />
                  </Col>
                </Row>
              ))}
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    )
  }
}

const styles = {
  container: {
    paddingBottom: 0
  },
  subForm: {
    marginBottom: '20px'
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    fontSize: '14px',
    borderBottom: '1px solid #eee'
  },
  formItem: {
    lineHeight: '30px',
    marginBottom: '25px'
  },
  formLabel: {
    textAlign: 'left',
    height: '30px',
    borderBottom: '#DCDEE3 1px solid'
  },
  btns: {
    margin: '25px 0'
  },
  resetBtn: {
    marginLeft: '20px'
  }
}
