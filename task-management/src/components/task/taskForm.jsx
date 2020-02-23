import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { observer, inject } from "@tarojs/mobx";
import { AtForm, AtInput } from "taro-ui"
import "./taskForm.scss";
import taskStore from '../../store/task';
import userStore from '../../store/user';

const {taskForm} = taskStore
@inject("taskStore")
@inject("userStore")
@observer
class TaskForm extends Component {
  state = {

  };
  async componentDidMount() {
    // console.log('openid',Taro.getStorageSync('openid'));
    //获取到user信息
    await userStore.getUser()
    const {user} = userStore
    console.log('user2',user._id);
   }
  onTitle = (e)=>{
    taskForm.title=e
  }
  onDescription = (e)=>{
    taskForm.description=e
  }
  onDeadline = (e)=>{
    taskForm.deadline=e
  }
  onDestination = (e)=>{
    taskForm.destination =e
  }
  onSchool = (e)=>{
    taskForm.school =e
  }
  onMoney = (e)=>{
    taskForm.money=e
  }
  render() {
    const { title,description,deadline,destination,school,money } = taskStore.taskForm
    return (
      <View className='task-form' style={{ width: "100%" }}>
              <AtForm>
                <AtInput name='title' title='任务标题' type='text' placeholder='请输入任务标题' value={title} onChange={this.onTitle} />
                <AtInput name='description' title='任务描述' type='text' placeholder='请输入任务描述' value={description} onChange={this.onDescription} />
                <AtInput name='deadline' title='截止日期' type='text' placeholder='请输入截止日期' value={deadline} onChange={this.onDeadline} />
                <AtInput name='destination' title='目的地' type='text' placeholder='请输入目的地' value={destination} onChange={this.onDestination} />
                <AtInput name='school' title='学校/校区' type='text' placeholder='请输入所在学校/校区' value={school} onChange={this.onSchool} />
                <AtInput name='money' title='赏金' type='number' placeholder='请输入任务赏金' value={money} onChange={this.onMoney} />
              </AtForm>
      </View>
    );
  }
}
export default TaskForm;
