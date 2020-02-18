import Taro, { Component } from '@tarojs/taro'
import {observer,inject} from '@tarojs/mobx'
import { View, Button, Image } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"

// import { observer, inject } from '@tarojs/mobx'
// import { AtTag } from 'taro-ui'

import './personal.scss'
import userStore from '../../store/user'

@inject('userStore')
@observer
class Personal extends Component {
  state = {
    needAuth: false, //是否需要授权
    openModal: false, //是否打开授权面板
    avatarUrl: '' //用户头像
  }
  async componentDidMount() {
    try {
      //获取登录凭证（code）
      const loginRes = await Taro.login({})
      userStore.code = loginRes.code
      await userStore.getOpenId().then(res=>{
        console.log('返回值',res);
        // Taro.setStorage('openid',res.data.openid)
      });
      // console.log(Taro.getStorage('openid'));
      
      if (loginRes.code) {
        console.log('登录凭证',loginRes.code)
      }

      // 处理服务端用户验证
      // 处理完成
      const res = await Taro.getSetting({})
      if (!res.authSetting['scope.userInfo']) {
        // 需要提示授权
        this.setState({
          needAuth: true
        })
      }
      if (res.authSetting['scope.userInfo'] === true) {
        const user = await Taro.getUserInfo({})
        console.log('用户信息',user)
        this.setState({
          avatarUrl: user.userInfo.avatarUrl,
          openModal: false,
          needAuth: false
        })
      }
    } catch (error) {
      console.log('错误信息',error)
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
  //获取用户信息
  bindGetUserInfo = async (e) => {
    //如果有用户信息的话
    if (e.detail.userInfo) {
      await this.setState({
        avatarUrl: e.detail.userInfo.avatarUrl,
        openModal: false,
        needAuth: false
      })
    }
  }
  render() {
    const { needAuth, openModal, avatarUrl } = this.state
    return (
      <View className='Personal'>
        {
          needAuth
            ? <View onClick={this.handleOpenModal}>点击登录</View>
            : <View><Image src={avatarUrl}></Image></View>
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
