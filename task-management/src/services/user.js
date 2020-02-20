import httpServeic from './httpService'

const service = {
  getOpenId(code) {
    return httpServeic.get({
      url: `http://localhost:3000/login/${code}`
    })
  },
  createUser(user) {
    return httpServeic.post({
      url: 'http://localhost:3000/user',
      data: user
    })
  },
  getUser(){
    return httpServeic.get({
      url: `http://localhost:3000/user`
    })
  },
  editInfo(user) {
    return httpServeic.put({
      url: 'http://localhost:3000/user',
      data: user
    })
  }
}
export default service
