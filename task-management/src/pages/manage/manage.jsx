import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAccordion, AtListItem } from 'taro-ui'
import GetManage from '../../components/manage/getManage'
import PublishManage from '../../components/manage/publishManage'
import './manage.scss'

class Manage extends Component {
  state = {
    publishOpen: true,
    getOpen: true,
  }
  async componentDidShow() {
    // await manageStore.getNumber()
  }
  //查看发布管理列表
  handlePublish = async () => {
    await this.setState({
      publishOpen: !this.state.publishOpen
    })
  }
  //查看领取管理列表
  handleGet = async () => {
    await this.setState({
      getOpen: !this.state.getOpen
    })
  }
  config = {
    navigationBarTitleText: '任务管理'
  }
  render() {

    return (
      <View className='manage'>
        <View className='manage-header'>
          <AtListItem
            hasBorder={false}
            title='管理列表'
            thumb='https://tva1.sinaimg.cn/large/0082zybpgy1gc7d9ivwcjj300w00wa9t.jpg'
          />
        </View>
        <View className='manage-publish'>
          <AtAccordion title='发布管理' icon={{ value: 'shopping-bag', color: '#1296db', size: '20' }}
            open={this.state.publishOpen}
            onClick={this.handlePublish}
          >
            <PublishManage></PublishManage>
          </AtAccordion>
        </View>
        <View className='manage-get'>
        {/* icon={{ prefixClass: 'task', value: 'home',color:'red', size: '15' }} */}
          <AtAccordion title='领取管理' icon={{ value: 'shopping-cart',color:'green', size: '20' }}
            open={this.state.getOpen}
            onClick={this.handleGet}
          >
            <GetManage></GetManage>
          </AtAccordion>
        </View>
      </View>
    )
  }
}
export default Manage 