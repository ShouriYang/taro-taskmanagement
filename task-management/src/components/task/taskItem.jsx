import Taro, { Component } from "@tarojs/taro";
import { observer } from '@tarojs/mobx';
import { View, Text, Image } from "@tarojs/components";
import { AtTag,AtButton, AtFloatLayout, AtMessage, AtRate } from "taro-ui";
import Layout from "./taskLayout"
import './taskItem.scss'
import taskStore from '../../store/task';
import messageStore from '../../store/message';
import userStore from '../../store/user';

@observer
class TaskItem extends Component {
  state = {
    openGet: false,
    score: 0
  }
  async componentDidMount() {
    console.log('publisherId',this.props.task.publisherId,'openid',userStore.openid);
    const res = await taskStore.getStore(this.props.task.publisherId)
    this.setState({
      score: res.data
    })
  }
  changeGet = async () => {
    await this.setState({
      openGet: !this.state.openGet
    })
  }
  getTask = async () => {
    const res = await taskStore.getTask(this.props.task._id)
    await taskStore.getTasks()
    if (res.statusCode === 200) {
      await messageStore.postMessage(this.props.task._id)
      this.props.task.status = '已领取'
      Taro.atMessage({
        'message': '领取成功',
        'type': 'success'
      })
      this.changeGet()
    } else {
      Taro.atMessage({
        'message': res.data.message,
        'type': 'error'
      })
    }
  }
  render() {
    const { task } = this.props
    return (
      <View className='task-item'>
        <AtMessage></AtMessage>
        <View className='task-card'>
          <View className='task-title'>
            <Text style={{ flex: '1' }}>{task.title}</Text>
            <Image onClick={this.changeGet} src='https://tva1.sinaimg.cn/large/0082zybpgy1gc5iv9p75jj305k05kdg1.jpg' style={{ width: '25px', height: '25px' }}></Image>
          </View>
          <View className='task-detail'>
            <Image src={task.publisherAvatar} style={{ width: '50px', height: '50px', borderRadius: '50px', boxShadow: '0px 3px 5px 5px rgba(0, 0, 0, 0.15)' }}>
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
              <AtRate
                value={this.state.score}
              />
            </View>
          </View>
        </View>
        <AtFloatLayout isOpened={this.state.openGet} title='任务详情' onClose={this.changeGet}>
          <Layout task={task}></Layout>
          {
            userStore.openid === task.publisherId ?
              <AtButton type='primary' style={{ width: '50% !important' }} circle disabled>您不能领取自己发布的任务</AtButton>
              :
              <AtButton type='primary' style={{ width: '50% !important' }} circle onClick={this.getTask}>领取任务</AtButton>
          }
        </AtFloatLayout>
      </View>
    )
  }
}

export default TaskItem;
