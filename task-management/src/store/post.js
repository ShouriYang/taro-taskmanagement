import {observable} from 'mobx'
import service from '../services'

const postStore = observable({
    posts:[],
    getPosts(){
      service.getPostList().then(res=>{
        this.posts.push(...res.data)
      })
    }  

})
export default postStore