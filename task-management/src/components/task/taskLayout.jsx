import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtTag, AtButton, AtFloatLayout, AtListItem, AtTimeline } from "taro-ui";
import './taskLayout.scss'

class TaskItem extends Component {
  state = {

  }
  componentDidMount() {

  }
  render() {
    return (
      <View className='layout'>
        <View className='layout-header'>
          <Image src='https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKPPSrzVYf4qwVc11BvGpn9P0RxHdleKdsoctVNbvpRnYyGSyqCZbpGJBQh3JsbOYia4ruEf9tbgJw/132' style={{ width: '50px', height: '50px', borderRadius: '50px', boxShadow: '0px 3px 5px 5px rgba(0, 0, 0, 0.15)' }}>
          </Image>
          <View className='layout-text'>
            <Text style={{ fontSize: '16px', fontWeight: '500', color: '#ef6c6e' }}>姓名</Text>
            <Text>任务描述</Text>
          </View>
        </View>
        <AtTimeline style={{marginLeft:'20px'}}
          items={[
            { title: '目的地',icon:'map-pin' },
            { title: '截止时间', icon:'bell', color: 'green' },
            { title: '任务状态', icon:'loading-2', color: 'red' },
            { title: '任务赏金', icon:'money',color: 'yellow' }
          ]}
        >
        </AtTimeline>
        <AtButton type='primary' style={{width:'50% !important'}} circle>领取任务</AtButton>
      </View>
    )
  }
}

export default TaskItem;
