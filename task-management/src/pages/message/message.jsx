import Taro, { Component } from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { AtListItem, AtList } from 'taro-ui'
import { View } from '@tarojs/components'
import MessageItem from '../../components/message/messageItem'
import './message.scss'
import messageStore from '../../store/message'

@inject('messageStore')
@observer
class Message extends Component {
  state = {
    
  }
  componentDidMount() {

  }
  async componentDidShow() {
    await messageStore.getMessages();
  }
  config = {
    navigationBarTitleText: '消息列表'
  }


  render() {
    return (
      <View className='message'>
        <View className='message-header'>
          <AtListItem
            hasBorder={false}
            title='消息列表'
            thumb='https://tva1.sinaimg.cn/large/0082zybpgy1gc7d1sx1anj305k05kt8o.jpg'
          />
        </View>
        <View className='message-list'>
          <AtList>
            {
              messageStore.messages.slice().map(message => {
                return (
                  <MessageItem key={message._id} message={message}></MessageItem>
                )
              }
              )
            }
          </AtList>
        </View>

      </View>
    )
  }
}
export default Message 