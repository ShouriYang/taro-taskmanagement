import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {  AtAccordion, AtTabBar } from 'taro-ui'


class Manage extends Component {
  state = {
    taskOpen: false,
    taskCurrent: 0
  }
  componentDidMount() {

  }
  handleTask = async () => {
    await this.setState({
      taskOpen: !this.state.taskOpen
    })
  }
  handleCurrent = async (value) =>{
    await this.setState({
      taskCurrent:value
    })
  }
  config = {
    navigationBarTitleText: '任务管理'
  }
  render() {
    return (
      <View className='manage'>
        <AtAccordion title='任务订单' icon={{ value: 'chevron-down', color: 'red', size: '15' }}
          open={this.state.taskOpen}
          onClick={this.handleTask}
        >
          <AtTabBar
            tabList={[
              { title: '新发布', text: 8 },
              { title: '进行中' },
              { title: '待确认', dot: true },
              { title: '已完成', dot: true }
            ]}
            onClick={this.handleCurrent}
            current={this.state.taskCurrent}
          />
        </AtAccordion>
      </View>
    )
  }
}
export default Manage 