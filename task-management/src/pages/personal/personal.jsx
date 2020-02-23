import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Button } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtNoticebar, AtButton, AtMessage } from "taro-ui"
import Center from './personalCenter'

import './personal.scss'
import userStore from '../../store/user'

@inject('userStore')
@observer
class Personal extends Component {
  state = {
    needAuth: false, //是否需要授权
    openModal: false, //是否打开授权面板
  }
  async componentDidMount() {
    try {
      //获取登录凭证（code）
      const loginRes = await Taro.login({})
      userStore.code = loginRes.code
      //通过code请求获取openid
      userStore.getOpenId().then(res => {
        console.log('请求获取openid');
        Taro.setStorageSync('openid', res)
      })

      //判断小程序是否请求过权限
      const res = await Taro.getSetting({})
      if (!res.authSetting['scope.userInfo']) {
        await this.setState({
          needAuth: true
        })
      }
      //获取用户信息
      if (res.authSetting['scope.userInfo'] === true) {
        // const user = await Taro.getUserInfo({})
        console.log('每次登录获取openid',Taro.getStorageSync('openid'))
        await userStore.getUser()
        await this.setState({
          openModal: false,
          needAuth: false
        })
      }
    } catch (error) {
      console.log('错误信息', error)
    }
  }
  config = {
    navigationBarTitleText: '个人中心'
  }
  handleOpenModal = async () => {
    await this.setState({
      openModal: true
    })
  }
  closeModal = async () => {
    await this.setState({
      openModal: false
    })
  }
  //只有在点击授权之后会触发获取用户信息
  bindGetUserInfo = async (e) => {
    //如果有用户信息的话
    if (e.detail.userInfo) {
      userStore.user = e.detail.userInfo
      //第一次授权登录的时候创建用户
      await userStore.createUser().then(res => {
        console.log('创建用户返回的信息',res);
        if (res.statusCode === 201) {
          userStore.user = res.data
          console.log('用户存在时store里的user',userStore.user);
        } else {
          const data = res.data
          userStore.user.wechat = data.wechat
          userStore.user.score = data.score
          console.log('新插入用户时store里的user',userStore.user);
        }
      })
      await this.setState({
        openModal: false,
        needAuth: false
      })
    }
  }
  render() {
    const { needAuth, openModal } = this.state
    return (
      <View className='Personal'>
        {
          needAuth
            ? <View>
              <AtNoticebar icon='volume-plus'>
                根据官方要求,您需要授权登录
              </AtNoticebar>
              <View className='personal-auth'></View>
              <AtButton onClick={this.handleOpenModal} type='primary' size='normal'>点击授权</AtButton>
            </View>
            : <View>
              <AtMessage></AtMessage>
              <Center></Center>
            </View>
        }

        <AtModal isOpened={openModal}>
          <AtModalHeader>授权提醒</AtModalHeader>
          <AtModalContent>
            将获取你的昵称、头像、地区
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.closeModal}>取消</Button>
            <Button open-type='getUserInfo' onGetUserInfo={this.bindGetUserInfo}>授权</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

export default Personal
