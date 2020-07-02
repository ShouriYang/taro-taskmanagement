import Taro, { Component } from '@tarojs/taro'
import {observer} from '@tarojs/mobx'
import { AtMessage,AtFloatLayout, AtListItem,AtModal,AtModalAction,AtModalContent,AtModalHeader } from 'taro-ui'
import { View,Text,Button } from '@tarojs/components'
import MessageStore from '../../store/message'
import Layout from './messageLayout'

@observer
class MessageItem extends Component {
  state = {
    openLayout: false,
    openModal: false
  }
  componentDidMount() {

  }
  async componentDidShow() {
    console.log(this.state.openLayout);
  }
  changeLayout = async () => {
    await this.setState({
      openLayout: !this.state.openLayout
    })
  }
  longTap = ()=>{
    this.changeModal()
  }
  changeModal = async()=>{
    console.log('changeModal');

    await this.setState({
      openModal : !this.state.openModal
    })
  }
  deleteConfirm = async()=>{
    await MessageStore.deleteMessage(this.props.message._id)
    await MessageStore.getMessages()
    this.changeModal()
    Taro.atMessage({
      type:'success',
      message:'删除成功'
    })
  }
  render() {
    const { message } = this.props
    return (
      <View className='message-item' onLongPress={this.longTap}>
        <AtMessage></AtMessage>
        <AtListItem
          title={message.info}
          extraText='联系方式'
          arrow='right'
          onClick={this.changeLayout}
          thumb={message.userAvatar}
        />
        <AtFloatLayout isOpened={this.state.openLayout} title='详细信息' onClose={this.changeLayout}>
          <Layout message={message}></Layout>
        </AtFloatLayout>
        <AtModal isOpened={this.state.openModal}>
          <AtModalHeader>确认删除</AtModalHeader>
          <AtModalContent>
            <Text>
              您确定要删除这条消息吗？
            </Text>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.changeModal}>取消</Button>
            <Button onClick={this.deleteConfirm}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
export default MessageItem 