import httpService from './httpService'

const service = {
    //url,data
    getTaskList(need,status){
        return httpService.get({
            url:httpService.BASE_URL+`/manage/${need}/${status}`,
        })
    },
    getNumber(){
        return httpService.get({
          url:httpService.BASE_URL+'/manage',
        })
    },
    putScore(score,getterId){
        const data={}
        data.score=score
        return httpService.put({
          url:httpService.BASE_URL+`/manage/user/${getterId}`,
          data:data
        })
    },
    changeStatus(status,taskId){
      const data={}
      data.status=status
      return httpService.put({
        url:httpService.BASE_URL+`/manage/task/${taskId}`,
        data:data
      })
  },
    cancelTask(taskId){
      return httpService.delete({
        url:httpService.BASE_URL+`/manage/task/${taskId}`,
      })
    }
}
export default service