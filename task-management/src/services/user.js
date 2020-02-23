import httpService from './httpService'

const service = {
  getOpenId(code) {
    return httpService.get({
      url: httpService.BASE_URL+`/login/${code}`
    })
  },
  createUser(user) {
    return httpService.post({
      url: httpService.BASE_URL+'/user',
      data: user
    })
  },
  getUser(){
    return httpService.get({
      url: httpService.BASE_URL+'/user'
    })
  },
  editInfo(user) {
    return httpService.put({
      url: httpService.BASE_URL+'/user',
      data: user
    })
  }
}
export default service
