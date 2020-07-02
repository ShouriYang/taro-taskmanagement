import {observable} from 'mobx'
import service from '../services'

const postStore = observable({
    posts:[],
    postForm:{},
    starList:[],
    getPosts(){
      service.getPostList().then(res=>{
        this.posts=[]
        this.posts.push(...res.data)
      })
    },  
    addPost(){
      service.addPost(this.postForm).then(res=>{
        return res
      })
      this.postForm={}
    },
    putStar(id){
      service.putStar(id).then(res=>{
        return res
      })
    }


})
export default postStore