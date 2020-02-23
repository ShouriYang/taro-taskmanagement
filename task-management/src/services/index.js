import httpService from './httpService'

const service = {
    //url,data
    getPostList(){
        return httpService.get({
            url:httpService.BASE_URL+'/post'
        })
    }
}
export default service