import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtTag, AtButton, AtFloatLayout, AtListItem,AtSteps} from "taro-ui";
import Layout from "./taskLayout"
import './taskItem.scss'

class TaskItem extends Component {
  state = {
    openLayout: false,
    openModal: false
  }
  componentDidMount() {

  }
  changeLayout = async () => {
    await this.setState({
      openLayout: !this.state.openLayout
    })
    console.log('openlayout',this.state.openLayout);
  }
  changeModal = async()=>{
    await this.setState({
      openModal:!this.state.openModal
    })    
  }
  render() {
    return (
      <View className='task-item'>
        <View className='task-card'>
          <View className='task-title'>
            <Text style={{ flex: '1' }}>标题</Text>
            <Image onClick={this.changeLayout} src='https://tva1.sinaimg.cn/large/0082zybpgy1gc5iv9p75jj305k05kdg1.jpg' style={{ width: '25px', height: '25px' }}></Image>
          </View>
          <View className='task-detail'>
            <Image  src='https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKPPSrzVYf4qwVc11BvGpn9P0RxHdleKdsoctVNbvpRnYyGSyqCZbpGJBQh3JsbOYia4ruEf9tbgJw/132' style={{ width: '50px', height: '50px', borderRadius: '50px', boxShadow: '0px 3px 5px 5px rgba(0, 0, 0, 0.15)' }}>
            </Image>
            <View className='task-desc'>任务描述</View>
            <View className='task-money'>
              <AtTag active >¥2</AtTag>
            </View>
          </View>
          <View className='task-footer'>
            <View className='create-time'>
              创建时间
            </View>
            <View className='task-status'>
              <AtTag type='primary' active >任务状态</AtTag>
            </View>
          </View>
        </View>
        <AtFloatLayout isOpened={this.state.openLayout} title='任务详情' onClose={this.changeLayout}>
          <Layout></Layout>
        </AtFloatLayout>
      </View>
    )
  }
}

export default TaskItem;
