import Taro, { Component } from "@tarojs/taro";
import { observer,inject } from '@tarojs/mobx';
import { View, Text, Image } from "@tarojs/components";
import { AtTag, AtButton, AtFloatLayout, AtMessage} from "taro-ui";
import Layout from "./taskLayout"
import './taskItem.scss'
import taskStore from '../../store/task';
import messageStore from '../../store/message';

@inject('taskStore')
@inject('messageStore')
@observer
class TaskItem extends Component {
  state = {
    openGet: false
  }
  componentDidMount() {

  }
  changeGet = async()=>{
    await this.setState({
      openGet:!this.state.openGet
    })    
  }
  getTask = async()=>{
    await taskStore.getTask(this.props.task._id)
    await messageStore.postMessage(this.props.task._id)
    this.props.task.status = '已领取'
    Taro.atMessage({
      'message':'领取成功',
      'type':'success'
    })
    this.changeGet()
  }
  render() {
    const {task} = this.props
    return (
      <View className='task-item'>
        <AtMessage></AtMessage>
        <View className='task-card'>
          <View className='task-title'>
            <Text style={{ flex: '1' }}>{task.title}</Text>
            <Image onClick={this.changeGet} src='https://tva1.sinaimg.cn/large/0082zybpgy1gc5iv9p75jj305k05kdg1.jpg' style={{ width: '25px', height: '25px' }}></Image>
          </View>
          <View className='task-detail'>
            <Image  src={task.publisherAvatar} style={{ width: '50px', height: '50px', borderRadius: '50px', boxShadow: '0px 3px 5px 5px rgba(0, 0, 0, 0.15)' }}>
            </Image>
            <View className='task-desc'>{task.description}</View>
            <View className='task-money'>
              <AtTag active >¥{task.money}</AtTag>
            </View>
          </View>
          <View className='task-footer'>
            <View className='create-time'>
              {task.publishDate}
            </View>
            <View className='task-status'>
              <AtTag type='primary' active >{task.status}</AtTag>
            </View>
          </View>
        </View>
        <AtFloatLayout isOpened={this.state.openGet} title='任务详情' onClose={this.changeGet}>
          <Layout task={task}></Layout>
          <AtButton type='primary' style={{ width: '50% !important' }} circle onClick={this.getTask}>领取任务</AtButton>
        </AtFloatLayout>
      </View>
    )
  }
}

export default TaskItem;
