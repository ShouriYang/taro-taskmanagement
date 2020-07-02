import Taro, { Component } from '@tarojs/taro'
import { AtAvatar, AtButton, AtMessage, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtRate } from 'taro-ui'
import { View, Button, Text } from '@tarojs/components'
import manageStore from '../../store/manage'
import './getItem.scss'



class GetItem extends Component {
  state = {
    openModal: false,
    score: 0
  }
  componentDidMount() {

  }
  async componentDidShow() {

  }
  changeModal = async () => {
    await this.setState({
      openModal: !this.state.openModal
    })
  }
  changeScore = async (value) => {
    await this.setState({
      score: value
    })
  }
  handleConfirm = async () => {
    await manageStore.putScore(this.state.score, this.props.item.getterId)
    await manageStore.changeStatus('领取者已确认', this.props.item._id)
    manageStore.getNumbers.haveGet -= 1
    manageStore.getNumbers.getConfirm += 1
    await manageStore.getGetList(1)
    this.changeModal()
    Taro.atMessage({
      type: 'success',
      message: '确认成功'
    })
  }
  change
  render() {
    const { item } = this.props
    // const date = new Date(item.publishDate)
    // console.log('时间戳',new Date().getTime()-date.getTime());
    
    // console.log('item', item);
    // console.log(this.props);
    return (
      <View className='manage-item'>
        <AtMessage></AtMessage>
        <View className='item-header'>
          <View className='item-divide'></View>
          <View className='item-title'>{item.title}</View>
          <View className='item-card'>
            <AtAvatar size='small' circle image='https://tva1.sinaimg.cn/large/0082zybpgy1gc8zvt9fj7j305k05kdg0.jpg'></AtAvatar>
          </View>
        </View>
        <View className='item-description'>{item.description}</View>
        <View className='item-detail'>
          <View className='item-getter'>发布人：{item.publisher}</View>
          <View className='item-destination'>目的地：{item.destination}</View>
        </View>
        <View className='item-footer'>
          <View className='item-date'>日期：{item.publishDate}</View>
          <View className='item-operation'>
            {item.status === '已领取' ? <AtButton type='primary' size='small' circle onClick={this.changeModal}>确认完成</AtButton> : <View></View>}
          </View>
        </View>
        <AtModal isOpened={this.state.openModal}>
          <AtModalHeader>确认完成</AtModalHeader>
          <AtModalContent>
            <Text>
              请您为发布者打分,以获得更佳服务
            </Text>
            <AtRate
              customStyle={{ marginTop: '15px' }}
              value={this.state.score}
              onChange={this.changeScore}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.changeModal}>取消</Button>
            <Button onClick={this.handleConfirm}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
export default GetItem 