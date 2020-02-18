import {observable} from 'mobx'
import service from '../services';

const taskStore = observable({
    tasks:[],
    getTasks(){
      service.getTaskList().then(res=>{
        this.tasks.push(...res.data)
      })
    }  
})

export default taskStore