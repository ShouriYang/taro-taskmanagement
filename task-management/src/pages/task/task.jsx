import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtList, AtListItem, AtIcon, AtButton, AtSearchBar } from 'taro-ui'
import taskHeader from '../../assets/images/task-center.png'
import './task.scss'

@inject('taskStore')
@inject('userStore')
@observer
class Task extends Component {
  state = {
    openModal: false,
    search: ''
  }
  componentDidMount() {

  }
  config = {
    navigationBarTitleText: '任务大厅'
  }
  changeSearch = async (value) => {
    await this.setState({
      search: value
    })
  }
  onSearch = async () => {
    console.log('开始搜索', this.state.search);
  }
  changeModal = async () => {
    await this.setState({
      openModal: !this.state.openModal
    })
  }
  render() {
    return (
      <View className='task' style={{ width: '100%' }}>
        {/* <AtList>
          <AtListItem
            title='欢迎来到任务大厅'
            extraText='发布任务'
            arrow='right'
            onClick={this.changeModal}
            thumb={taskHeader}
          />
        </AtList> */}
        <View className='at-row at-row__justify--around task-header'>
          <View className='at-col at-col-7'>
            <AtSearchBar
              actionName='搜索'
              value={this.state.value}
              onChange={this.changeSearch}
              onActionClick={this.onSearch}
            />
          </View>
          <View className='at-col at-col-4'>
            <AtButton type='primary'>
              <AtIcon value='add'></AtIcon>
              发布任务
            </AtButton>
          </View>
        </View>
      </View>
    )
  }
}
export default Task 