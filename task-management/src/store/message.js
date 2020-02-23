import {observable} from 'mobx'
import service from '../services/message'

const messageStore = observable({
    notRead:3,
    getMessages(){
      service.getMessages().then(res=>{
        console.log('获取消息列表',res);
      })
    },
    postMessage(id){
      service.postMessage(id).then(res=>{
        console.log('发送消息',res);
      })
    },
    readMessage(id){
      service.readMessage(id).then(res=>{
        console.log('阅读消息',res);
      })
    }
    

})
export default messageStore