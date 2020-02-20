import Taro from '@tarojs/taro'

//网络请求拦截器：可以加header
const interceptor =  chain => {
    const requestParams = chain.requestParams
    const { method, data, url } = requestParams
    //扩充请求参数:添加token为openid
    const token = Taro.getStorageSync('openid');
    requestParams.header = {...requestParams,token}
    console.log(`http ${method || 'GET'} --> ${url} data: `, data)
  
    return chain.proceed(requestParams)
      .then(res => {
        console.log(`http <-- ${url} result:`, res)
        return res
      })
    }
  Taro.addInterceptor(interceptor)
//option 包含
// {
//     url:string; data:json; header:json
// }
export default {
  request(option, method = 'GET') {
    return Taro.request({
      ...option,
      method,
      header: {
        'content-type': 'application/json',
        ...option.header
      }
    })
  },
  //option里面主要包含url和data
  get(option) {
    return this.request(option, 'GET')
  },
  post(option) {
    return this.request(option, 'POST')
  },
  put(option){
    return this.request(option, 'PUT')
  },
  delete(option) {
    return this.request(option, 'DELETE')
  }
}
