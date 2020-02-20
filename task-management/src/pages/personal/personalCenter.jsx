import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtList, AtListItem, AtRate, AtModal, AtModalHeader, AtModalContent, AtModalAction,AtInput,AtNoticebar,AtMessage } from 'taro-ui'
import { observer } from '@tarojs/mobx'
import userStore from '../../store/user'


@observer
class Center extends Component {
  state = {
    openModal: false,
    wechat: ''
  }
  async componentDidMount() {

  }
  editInfo = async() => {
    console.log('执行editinfo');
    await userStore.editInfo(this.state.wechat).then(res=>{
      console.log(res);
      if(res===200){
        Taro.atMessage({
          'message':'修改成功',
          'type':'success'
        })
      }else{
        Taro.atMessage({
          'message':res,
          'type':'error'
        })
      }
    })
    this.changeModal();
  }
  changeInput = (value)=>{
     this.setState({
      wechat:value
    })
    return value
  }
  changeModal = async () => {
    await this.setState({
      openModal: !this.state.openModal
    })
  }

  render() {
    const { user } = userStore
    const gender = user.gender === 1 ? '男' : '女'
    // console.log('个人中心用户信息', user);
    return (
      <View className='center' >
        <AtMessage></AtMessage>
        <View style={{ textAlign: 'center' }}>
          <Image src={user.avatarUrl} style={{ margin: '10px', width: '80px', height: '80px', borderRadius: '80px', boxShadow: '0px 3px 5px 5px rgba(0, 0, 0, 0.15)' }}></Image>
        </View>
        <AtList>
          <AtListItem
            title={user.nickName}
            thumb='https://i.loli.net/2020/02/19/QeGJD3jUNTv8lLw.png'
          />
          <AtListItem
            title='任务订单'
            arrow='right'
            note='领取的所有任务'
            thumb='https://i.loli.net/2020/02/19/qhNdvZgGmbyaLJu.png'
          />
          <AtListItem
            title='发布订单'
            arrow='right'
            note='发布的所有任务'
            thumb='https://i.loli.net/2020/02/19/nNWbsJocO71ka3M.png'
          />
          <AtListItem
            title={gender}
            thumb='https://i.loli.net/2020/02/19/j6JHLuoEl8ZM9W5.png'
          />
          <AtListItem
            title='个人得分'
            thumb='https://i.loli.net/2020/02/19/dS2voeJ9Yr3utMN.png'
          />
          <AtRate
            customStyle={{ textAlign: 'center', margin: '10px 0' }}
            value={user.score}
          />
          <AtListItem
            onClick={this.changeModal}
            title={user.wechat}
            arrow='right'
            extraText='联系方式'
            thumb='https://i.loli.net/2020/02/19/U8YzSahq5NQB3fE.png'
          />
        </AtList>
        <AtModal isOpened={this.state.openModal}>
          <AtModalHeader>完善联系方式</AtModalHeader>
          <AtModalContent>
            <AtNoticebar icon='volume-plus' close>
              联系方式仅供发布/领取人联系您的时候使用。
            </AtNoticebar>
            <AtInput
              customStyle={{marginLeft:'0px'}}
              name='wechat'
              type='text'
              placeholder='请输入您的联系方式'
              value={this.state.wechat}
              onChange={this.changeInput}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.changeModal}>取消</Button>
            <Button onClick={this.editInfo}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
export default Center 