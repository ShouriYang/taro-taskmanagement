import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { AtTabBar, AtDivider, AtIcon } from 'taro-ui'
import manageStore from '../../store/manage'
import ManageItem from './getItem'

@observer
class Get extends Component {
  state = {
    getCurrent: 1,

  }
  componentDidMount() {

  }
  async componentDidShow() {
    //获取状态为1:已领取的领取任务列表
    await manageStore.getGetList(this.state.getCurrent)
  }
  switchGet = async (value) => {
    if (value === 0) {
      await Taro.switchTab({
        url: '/pages/task/task'
      })
    } else {
      await manageStore.getGetList(value)
      await this.setState({
        getCurrent: value
      })
    }
  }
  render() {
    return (
      <View>
        <AtTabBar
          tabList={[
            { title: '去发布', image: 'https://tva1.sinaimg.cn/large/0082zybpgy1gc8qimjxdlj305k05k3yo.jpg', text: 'new' },
            { title: '已领取', image: 'https://tva1.sinaimg.cn/large/0082zybpgy1gc8p5l7hntj305k05kaa1.jpg', text: manageStore.getNumbers.haveGet },
            { title: '待确认', image: 'https://tva1.sinaimg.cn/large/0082zybpgy1gc8p6dg048j305k05k3yo.jpg', text: manageStore.getNumbers.getConfirm },
            { title: '已完成', image: 'https://tva1.sinaimg.cn/large/0082zybpgy1gc8p6s66pvj305k05kmx9.jpg', text: manageStore.getNumbers.publishConfirm }
          ]}
          onClick={this.switchGet}
          current={this.state.getCurrent}
        />
        <AtDivider>
          <AtIcon value='check-circle'></AtIcon>
        </AtDivider>
        <View className='get-list'>
          {
            manageStore.getList.slice().map(item =>
              <ManageItem key={item._id} item={item}></ManageItem>
            )
          }
        </View>
      </View>
    )
  }
}
export default Get 