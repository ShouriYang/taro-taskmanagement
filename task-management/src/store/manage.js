import {observable} from 'mobx'
import service from '../services/manage'

const manageStore = observable({
    publishList:[],
    publishNumbers:{},
    getList:[],
    getNumbers:{},
    //获取每个发布任务和领取任务的数量
    async getNumber(){
      await service.getNumber().then(res=>{
        this.publishNumbers=res.data.publishNumber
        this.getNumbers=res.data.getNumber
        // console.log(this.publishNumber,this.getNumber)
      })
    },
    //根据状态按需获取获取发布任务列表
    async getPublishList(status){
      //need代表需要的是任务发布的列表/任务领取的列表
      const need = 0
      await service.getTaskList(need,status).then(res=>{
        this.publishList = []
        this.publishList.push(...res.data)
        // console.log('publishList',this.publishList);
      })
    },
    //根据状态按需获取领取任务列表
    async getGetList(status){
      const need = 1
      await service.getTaskList(need,status).then(res=>{
        this.getList=[]
        this.getList.push(...res.data)
        // console.log('getList',this.getList);
      })
    },
    //为发布者/领取者打分
    putScore(score,getterId){
      service.putScore(score,getterId).then(res=>{
        console.log(res);
      })
    },
    //在界面中点击确认改变任务状态
    changeStatus(status,taskId){
      service.changeStatus(status,taskId).then(res=>{
        console.log(res);
      })
    },
    cancelTask(id){
      service.cancelTask(id).then(res=>{
        console.log(res);
      })
    }

})
export default manageStore