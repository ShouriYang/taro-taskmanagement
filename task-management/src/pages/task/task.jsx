import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtButton,AtIcon } from 'taro-ui'
import taskHeader from '../../assets/images/task-center.png'
import './task.scss'

@inject('taskStore')
@observer
class Task extends Component {
  state = {

  }
  componentDidMount() {

  }
  config = {
    navigationBarTitleText: '任务大厅'
  }
  render() {
    return (
      <View className='task' style={{ width: '100%' }}>
        <View className='at-row task-header' >
          <View className='at-col at-col-6' style={{verticalAlign:'middle'}}>
          <Text className='task task-star-o'></Text>
            任务大厅
          </View>
          <View className='at-col at-col-4'>          
            <AtButton type='primary' size='small'>发布任务</AtButton>
          </View>
        </View>
        {/* <View className='task-header'>
          <View className='at-col at-col-4'><Image style={{height:'20px',width:'20px'}} src={taskHeader}></Image>任务大厅</View>
          <View className='at-col at-col-4'>B</View>
          <View className='at-col at-col-3'><AtButton>发布任务</AtButton></View>
        </View> */}
      </View>
    )
  }
}
export default Task 