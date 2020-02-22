import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { observer, inject } from "@tarojs/mobx";
import { AtButton,AtFloatLayout, AtBadge, AtListItem } from "taro-ui"
import taskItem from "../../components/task/taskItem"
import taskForm from '../../components/task/taskForm'
import "./task.scss";

@inject("taskStore")
@observer
class Task extends Component {
  state = {
    openForm:false
  };
  componentDidMount() { }
  config = {
    navigationBarTitleText: "任务大厅"
  };
  openForm = async()=>{
    await this.setState({
      openForm:!this.state.openForm
    })
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
              <AtButton onClick={this.openForm} style={{ marginRight: '20px' }} type='primary' circle size='small'>
                发布任务
            </AtButton>
            </AtBadge>
          </View>
        </View>
        <View className='task-list'>
          <taskItem></taskItem>
        </View>
        <AtFloatLayout isOpened={this.state.openForm} title='发布任务' onClose={this.changeLayout}>
          <taskForm></taskForm>
        </AtFloatLayout>
        <View className='task-pagi'></View>
      </View>
    );
  }
}
export default Task;
