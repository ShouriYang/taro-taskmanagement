import Taro, { Component } from '@tarojs/taro'
import { AtTimeline, AtButton } from 'taro-ui'
import { View, Image, Text } from '@tarojs/components'

import './messageLayout.scss'

class Layout extends Component {
  state = {
  }
  componentDidMount() {

  }
  async componentDidShow() {

  }
  handleCall = () => {
    Taro.makePhoneCall({
      phoneNumber: this.props.message.userWechat,
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  }
  render() {
    const { message } = this.props
    return (
      <View className='message-layout'>
          <View className='layout-header'>
            <Image src={message.userAvatar} style={{ width: '50px', height: '50px', borderRadius: '50px', boxShadow: '0px 3px 5px 5px rgba(0, 0, 0, 0.15)' }}>
            </Image>
            <View className='layout-text'>
              <Text style={{ fontSize: '16px', fontWeight: '500', color: '#ef6c6e' }}>{message.user}</Text>
            </View>
          </View>
          <View className='layout-timeline'>
            <AtTimeline
              items={[
                { title: `任务标题:${message.taskTitle}`, icon: 'file-code' },
                { title: `任务描述:${message.taskDescrip}`, icon: 'edit',color:'yellow' },
                { title: `用户积分:${message.userScore}`, icon: 'analytics' },
                { title: `联系方式:${message.userWechat}`, icon: 'phone', color: 'green' },
                { title: `领取时间:${message.date}`, icon: 'calendar', color: 'blue' }
              ]}
            >
            </AtTimeline>
          </View>
          <AtButton type='primary' circle onClick={this.handleCall}>点击联系</AtButton>
      </View>
    )
  }
}
export default Layout 