import httpService from './httpService'

const service = {
  //url,data
  getMessages() {
    return httpService.get({
      url: httpService.BASE_URL+'/message'
    })
  },
  postMessage(taskid) {
    return httpService.post({
      url: httpService.BASE_URL+`/message/${taskid}`,
    })
  },
  deleteMessage(taskid){
    return httpService.delete({
      url: httpService.BASE_URL+`/message/${taskid}`,
    })
  },
  readMessage(id) {
    return httpService.put({
      url: httpService.BASE_URL+`/message/${id}`,
    })
  }
}
export default service