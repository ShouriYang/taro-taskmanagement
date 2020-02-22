import Taro, { Component } from "@tarojs/taro"
import { View, Button } from "@tarojs/components"
import { observer, inject } from "@tarojs/mobx";
import { AtForm, AtInput } from "taro-ui"
import "./taskForm.scss";

@inject("taskStore")
@observer
class TaskForm extends Component {
  state = {
    formValue:{}
  };
  componentDidMount() { }
  config = {
    navigationBarTitleText: "任务大厅"
  };
  submitForm = (event)=> {
    console.log(event)
  }
  resetForm = (event) => {
    console.log(event)
  }
  handleChange = async(value) => {
    await this.setState({
      value
    })
    console.log(value)
  }
  render() {
    const {formValue} = this.state
    return (
      <View className='task-form' style={{ width: "100%" }}>
       这里是表格页面
      </View>
    );
  }
}
export default TaskForm;
