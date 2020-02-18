import httpServeic from './httpService'

const service = {
    getOpenId(code){
        return httpServeic.get({
            url:`http://localhost:3000/login/${code}`
        })
    },
}
export default service