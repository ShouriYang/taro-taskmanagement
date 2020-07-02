import {observable} from 'mobx'
import service from '../services/task';

const taskStore = observable({
    tasks:[],
    taskForm:{},
    score:5,
    async getTasks(){
      await service.getTaskList().then(res=>{
        this.tasks = []
        this.tasks.push(...res.data)
      })
    },  
    publishTask(){
      service.publishTask(this.taskForm).then(res=>{
        console.log(res)
      })
    },
    //获取任务发布人的评分
    getStore(id){
      return service.getScore(id)
    },
    //领取/确认/完成任务
    getTask(id){
      return service.getTask(id)
    }
})

export default taskStore