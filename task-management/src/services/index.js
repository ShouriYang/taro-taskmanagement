import httpService from './httpService'

const service = {
    //url,data
    getPostList(){
        return httpService.get({
            url:httpService.BASE_URL+'/post'
        })
    },
    addPost(form){
      return httpService.post({
        url:httpService.BASE_URL+'/post',
        data:form
      })
    },
    putStar(id){
      console.log('id',id);
      return httpService.put({
        url:httpService.BASE_URL+`/post/${id}`
      })
    }
}
export default service