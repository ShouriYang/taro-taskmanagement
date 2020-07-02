import Taro from '@tarojs/taro'

//网络请求拦截器：可以加header
const interceptor = chain => {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams
  //扩充请求参数:添加token为openid
  if (Taro.getStorageSync('openid')) {
    console.log('有token');
    const token = Taro.getStorageSync('openid');
    requestParams.header = { ...requestParams, token }
  }
  console.log(`http ${method || 'GET'} --> ${url} data: `, data)
  //后端会对请求头校验，如果没有登录会返回401状态码，通过判断跳转到登录页面
  return chain.proceed(requestParams)
    .then(res => {
      if(res.statusCode===401){
        console.log('执行跳转');
        Taro.switchTab({
          url: '/pages/personal/personal'
        })
      }else{
        console.log(`http <-- ${url} result:`, res)
        return res
      }
    })
}
Taro.addInterceptor(interceptor)
const BASE_URL = 'http://localhost:3000'

//对请求进行统一管理，传入请求类型、请求头格式和请求数据
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
  BASE_URL,
  //option里面主要包含url和data
  get(option) {
    return this.request(option, 'GET')
  },
  post(option) {
    return this.request(option, 'POST')
  },
  put(option) {
    return this.request(option, 'PUT')
  },
  delete(option) {
    return this.request(option, 'DELETE')
  }
}
