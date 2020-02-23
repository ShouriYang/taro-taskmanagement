import httpService from './httpService'

const service = {
  //url,data
  getTaskList() {
    return httpService.get({
      url: httpService.BASE_URL+'/task'
    })
  },
  publishTask(task) {
    return httpService.post({
      url: httpService.BASE_URL+'/task',
      data: task
    })
  },
  getTask(id) {
    return httpService.put({
      url: httpService.BASE_URL+`/task/${id}`,
    })
  }
}
export default service