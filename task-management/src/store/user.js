import Taro from '@tarojs/taro'
import {
  observable
} from 'mobx'
import service from '../services/user'


const userStore = observable({
  user: {},
  openid: 0,
  sessionkey: 0,
  code: 0,
  async getOpenId() {
    await service.getOpenId(this.code).then((res) => {
      this.openid = res.data.openid;
    })
    return this.openid
  },
  async createUser() {
    console.log('创建用户时用户的信息',this.user);
    const res = await service.createUser(this.user)
    return res
  },
  async getUser() {
    const res = await service.getUser()
    console.log('获取到的user信息', res)
    this.user = res.data
  },
  async editInfo(wechat) {
    const info = {}
    info.wechat = wechat
    info.openid = this.openid
    // console.log('修改联系方式',info)
    const res = await service.editInfo(info)
    console.log('修改过后返回的user', res);
    if (res.statusCode === 200) {
      this.user.wechat = wechat
      return res.statusCode
    } else {
      return res.errMsg
    }
  }

})
export default userStore
