import {observable} from 'mobx'
import service from '../services/user'

const userStore = observable({
    user:{},
    openid: 0,
    sessionkey:0,
    code: 0,
    getOpenId(){
       service.getOpenId(this.code).then((res)=>{
            this.openid = res.data.openid;
            return this.openid;
       })
    }
    // createUser(user){
    //     const res = service.createUser(user)
    //     console.log(res)
    // }

})
export default userStore