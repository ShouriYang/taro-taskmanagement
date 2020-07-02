import Taro, { Component } from '@tarojs/taro'
import { AtAvatar, AtButton, AtMessage,AtModal, AtModalHeader, AtModalContent, AtModalAction, AtRate } from 'taro-ui'
import { View, Button, Text } from '@tarojs/components'
import manageStore from '../../store/manage'
import './manageItems.scss'


class PublishItem extends Component {
  state = {
    openModal: false,
    openCancel: false,
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
  changeCancel = async ()=>{
    await this.setState({
      openCancel: !this.state.openCancel
    })
  }
  changeScore = async (value) => {
    await this.setState({
      score: value
    })
  }
  handleConfirm = async () => {
    await manageStore.putScore(this.state.score, this.props.item.getterId)
    await manageStore.changeStatus('发布者已确认', this.props.item._id)
    manageStore.publishNumbers.getConfirm -= 1
    manageStore.publishNumbers.publishConfirm += 1
    await manageStore.getPublishList(0)
    this.changeModal()
    Taro.atMessage({
      type:'success',
      message:'确认成功'
    })
  }
  cancelConfirm = async()=>{
    await manageStore.cancelTask(this.props.item._id)
    manageStore.publishNumbers.notGet -= 1
    await manageStore.getPublishList(0)
    this.changeCancel()
    Taro.atMessage({
      type:'success',
      message:'取消成功'
    })
  }
  render() {
    const { item } = this.props
    console.log('item', item);
    console.log(this.props);
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
          <View className='item-getter'>领取人：{item.getter === '' ? '暂无' : item.getter}</View>
          <View className='item-destination'>目的地：{item.destination}</View>
        </View>
        <View className='item-footer'>
          <View className='item-date'>日期：{item.publishDate}</View>
          <View className='item-operation'>
            {item.status === '领取者已确认' ? <AtButton type='primary' size='small' circle onClick={this.changeModal}>点击确认</AtButton> : <View></View>}
            {item.status === '未领取' ? <AtButton type='primary' size='small' circle onClick={this.changeCancel}>取消发布</AtButton>: <View></View>}
          </View>
        </View>
        {
          //确认评分提交弹框
        }
        <AtModal isOpened={this.state.openModal}>
          <AtModalHeader>确认完成</AtModalHeader>
          <AtModalContent>
            <Text>
              请您为领取者打分,以获得更佳服务
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
        {
          //确认取消任务订单弹框
        }
        <AtModal isOpened={this.state.openCancel}>
          <AtModalHeader>确认取消</AtModalHeader>
          <AtModalContent>
            <Text>
              您确定要取消任务订单吗？取消之后该任务将不在任务大厅显示
            </Text>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.changeCancel}>取消</Button>
            <Button onClick={this.cancelConfirm}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
export default PublishItem 