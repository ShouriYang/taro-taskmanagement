import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { observer, inject } from "@tarojs/mobx";
import { AtButton, AtFloatLayout, AtBadge, AtListItem } from "taro-ui"
import TaskItem from "../../components/task/taskItem"
import TaskForm from '../../components/task/taskForm'
import "./task.scss";
import taskStore from '../../store/task';

@inject("taskStore")
@observer
class Task extends Component {
  state = {
    openPublish: false
  };
  async componentDidMount() {
    await taskStore.getTasks()
    console.log('didmont');
  }
  componentDidShow = async () => {
    await taskStore.getTasks()
    console.log('didshow');
  }
  config = {
    navigationBarTitleText: "任务大厅"
  };
  changePublish = async () => {
    await this.setState({
      openPublish: !this.state.openPublish
    })
  }
  onSubmit = async() => {
    await taskStore.publishTask()
    await taskStore.getTasks()
    this.changePublish()
  }
  onBack = () => {
    this.changePublish()
  }
  render() {
    return (
      <View className='task' style={{ width: "100%" }}>
        <View className='at-row task-header'>
          <View className='at-col at-col-6'>
            <AtListItem
              className='header-title'
              thumb='https://tva1.sinaimg.cn/large/0082zybpgy1gc5ish466bj305k05kaab.jpg'
              title='任务列表'
              hasBorder={false}
            />
          </View>
          <View className='at-col at-col-2'></View>
          <View className='at-col at-col-3 publish'>
            <AtBadge value='new'>
              <AtButton onClick={this.changePublish} style={{ marginRight: '20px' }} type='primary' circle size='small'>
                发布任务
            </AtButton>
            </AtBadge>
          </View>
        </View>
        <View className='task-list'>
          {
            taskStore.tasks.slice().map(task => {
              return (
                <TaskItem key={task._id} task={task}>
                </TaskItem>
              )

            }
            )
          }
        </View>
        <AtFloatLayout isOpened={this.state.openPublish} title='发布任务' onClose={this.changePublish}>
          <TaskForm></TaskForm>
          <View className='form-btn'>
            <AtButton circle type='primary' onClick={this.onSubmit}>发布任务</AtButton>
            <AtButton circle type='secondary' onClick={this.onBack}>返回大厅</AtButton>
          </View>
        </AtFloatLayout>
        <View className='task-pagi'></View>
      </View>
    );
  }
}
export default Task;
