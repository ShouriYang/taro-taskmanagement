import httpServeic from './httpService'

const service = {
    getTaskList(){
        return httpServeic.get({
            url:'http://localhost:3000/post'
        })
    },
    getPostList(){
        return httpServeic.get({
            url:'http://localhost:3000/post'
        })
    }
}
export default service