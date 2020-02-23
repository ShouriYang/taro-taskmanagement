import {observable} from 'mobx'
import service from '../services/task';

const taskStore = observable({
    tasks:[],
    taskForm:{},
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
    //领取/确认/完成任务
    getTask(id){
      service.getTask(id).then(res=>{
        console.log('领取任务之后返回的数据',res);
      })
    }
})

export default taskStore