import React, { Component } from 'react'
import { Table, Button, Icon, Pagination } from '@icedesign/base'
import IceContainer from '@icedesign/container'
import DataBinder from '@icedesign/data-binder'

// 注意：下载数据的功能，强烈推荐通过接口实现数据输出，并下载
// 因为这样可以有下载鉴权和日志记录，包括当前能不能下载，以及谁下载了什么
@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/platform/platform_user',
    method: 'get', // get: params   post: data
    params: {
      // skip: 0,
      // limit: 100
    },
    responseFormatter: (responseHandler, res, originResponse) => {
      // 做一些数据转换
      console.log(res)
      const { errno, errmsg, data } = res
      const newRes = {
        status: errno === 0 ? 'SUCCESS' : 'ERROR',
        message: errmsg,
        data
      }
      // 回传给处理函数
      // 不做回传处理会导致数据更新逻辑中断
      responseHandler(newRes, originResponse)
    },
    defaultBindingData: {
      data: [],
      count: 100,
      pageSize: 30,
      currentPage: 1
    }
  }
})
export default class SelectableTable extends Component {
  static displayName = 'SelectableTable'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.queryCache = {}
    // 表格可以勾选配置项
    this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: (ids) => {
        console.log('ids', ids)
        this.setState({
          selectedRowKeys: ids
        })
      },
      // 全选表格时触发的回调
      onSelectAll: (selected, records) => {
        console.log('onSelectAll', selected, records)
      },
      // 支持针对特殊行进行定制
      getProps: (record) => {
        return {
          disabled: record.id === 100306660941
        }
      }
    }

    this.state = {
      selectedRowKeys: []
      // dataSource: getMockData()
    }
  }

  componentDidMount() {
    // this.enquireScreenRegister()
    this.queryCache.page = 1
    this.queryCache.size = 30
    this.fetchData()
  }
  fetchData = () => {
    this.props.updateBindingData('tableData', {
      params: this.queryCache
    })
  }
  clearSelectedKeys = () => {
    this.setState({
      selectedRowKeys: []
    })
  }

  deleteSelectedKeys = () => {
    const { selectedRowKeys } = this.state
    console.log('delete keys', selectedRowKeys)
  }

  deleteItem = (record) => {
    const { id } = record
    console.log('delete item', id)
  }

  renderOperator = (value, index, record) => {
    return (
      <div>
        <a>编辑</a>
        <a style={styles.removeBtn} onClick={this.deleteItem.bind(this, record)}>
          删除
        </a>
      </div>
    )
  }
  changePage = (currentPage) => {
    this.queryCache.page = currentPage

    this.fetchData()
  }
  render() {
    const tableData = this.props.bindingData.tableData
    return (
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer style={styles.IceContainer}>
          <div>
            <Button size="small" style={styles.batchBtn}>
              <Icon type="add" />增加
            </Button>
            <Button
              onClick={this.deleteSelectedKeys}
              size="small"
              style={styles.batchBtn}
              disabled={!this.state.selectedRowKeys.length}
            >
              <Icon type="ashbin" />删除
            </Button>
            <Button onClick={this.clearSelectedKeys} size="small" style={styles.batchBtn}>
              <Icon type="close" />清空选中
            </Button>
          </div>
          <div>
            <a href="/" download>
              <Icon size="small" type="download" /> 导出表格数据到 .csv 文件
            </a>
          </div>
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={tableData.data}
            isLoading={tableData.__loading}
            rowSelection={{
              ...this.rowSelection,
              selectedRowKeys: this.state.selectedRowKeys
            }}
          >
            <Table.Column title="编码" dataIndex="id" width={80} />
            <Table.Column title="用户名" dataIndex="username" width={100} />
            <Table.Column title="姓名" dataIndex="name" width={100} />
            <Table.Column title="模板" dataIndex="template" width={160} />
            <Table.Column title="发布状态" dataIndex="status" width={120} />
            <Table.Column title="评分" dataIndex="rate" width={120} />
            <Table.Column title="操作者" dataIndex="publisher" width={120} />
            <Table.Column title="创建时间" dataIndex="created_at" width={120} />
            <Table.Column title="修改时间" dataIndex="updated_at" width={120} />
            <Table.Column title="操作" cell={this.renderOperator} lock="right" width={120} />
          </Table>
          <div style={styles.pagination}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.count}
              onChange={this.changePage}
            />
          </div>
        </IceContainer>
      </div>
    )
  }
}

const styles = {
  batchBtn: {
    marginRight: '10px'
  },
  IceContainer: {
    marginBottom: '20px',
    minHeight: 'auto',
    display: 'flex',
    justifyContent: 'space-between'
  },
  removeBtn: {
    marginLeft: 10
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px'
  }
}
