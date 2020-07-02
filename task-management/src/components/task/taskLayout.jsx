import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import {  AtTimeline } from "taro-ui";
import './taskLayout.scss'

class TaskItem extends Component {
  state = {

  }
  componentDidMount() {

  }
  render() {
    const { task } = this.props
    return (
      <View className='layout'>
        <View className='layout-header'>
          <Image src={task.publisherAvatar} style={{ width: '50px', height: '50px', borderRadius: '50px', boxShadow: '0px 3px 5px 5px rgba(0, 0, 0, 0.15)' }}>
          </Image>
          <View className='layout-text'>
            <Text style={{ fontSize: '16px', fontWeight: '500', color: '#ef6c6e' }}>{task.publisher}</Text>
            <Text>{task.description}</Text>
          </View>
        </View>
        <AtTimeline style={{ marginLeft: '20px' }}
          items={[
            { title: `目的地:${task.destination}`, icon: 'map-pin' },
            { title: `截止时间:${task.deadline}`, icon: 'bell', color: 'green' },
            { title: `任务状态:${task.status}`, icon: 'loading-2', color: 'red' },
            { title: `任务赏金:${task.money}`, icon: 'money', color: 'yellow' }
          ]}
        >
        </AtTimeline>
      </View>
    )
  }
}

export default TaskItem;