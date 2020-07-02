import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { AtTabBar, AtDivider, AtIcon } from 'taro-ui'
import manageStore from '../../store/manage'
import ManageItem from './publishItem'


@observer
class Publish extends Component {
  state = {
    publishCurrent: 0,

  }
  componentDidMount() {

  }
  async componentDidShow() {
    //获取状态为0:未领取的发布任务列表
    await manageStore.getPublishList(this.state.publishCurrent)
    await manageStore.getNumber()
  }
  switchPublish = async (value) => {
    console.log(value);
    await manageStore.getPublishList(value)
    await this.setState({
      publishCurrent: value
    })
  }
  render() {
    return (
      <View>
        <AtTabBar
          tabList={[
            { title: '新发布', image: 'https://tva1.sinaimg.cn/large/0082zybpgy1gc8p78c062j305k05k3yk.jpg', text: manageStore.publishNumbers.notGet },
            { title: '进行中', image: 'https://tva1.sinaimg.cn/large/0082zybpgy1gc8p7it4ysj305k05kglp.jpg', text: manageStore.publishNumbers.haveGet },
            { title: '待确认', image: 'https://tva1.sinaimg.cn/large/0082zybpgy1gc8p7s3p08j305k05kaa4.jpg', text: manageStore.publishNumbers.getConfirm },
            { title: '已完成', image: 'https://tva1.sinaimg.cn/large/0082zybpgy1gc8p815ljpj305k05kjrf.jpg', text: manageStore.publishNumbers.publishConfirm }
          ]}
          onClick={this.switchPublish}
          current={this.state.publishCurrent}
        />
        <AtDivider height='50px'>
          <AtIcon value='check-circle'></AtIcon>
        </AtDivider>
        <View className='publish-list'>
          {
            manageStore.publishList.slice().map(item =>
              <ManageItem key={item._id} item={item}></ManageItem>
            )
          }
        </View>
      </View>
    )
  }
}
export default Publish 