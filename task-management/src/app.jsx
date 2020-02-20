import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import taskStore from './store/task'
import userStore from './store/user'
import postStore from './store/post'
import messageStore from './store/message'


import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  postStore,taskStore,messageStore,userStore
}

class App extends Component {

  componentDidMount () {
    Taro.setTabBarBadge({
      index:2,
      text:`${messageStore.notRead}`
    })
  }

  config = {
    pages: [
      'pages/index/index',
      'pages/personal/personal',
      'pages/task/task',
      'pages/manage/manage',
      'pages/message/message'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    //配置底部tab栏
    tabBar:{
      list:[{
        pagePath:'pages/index/index',
        text:'首页',
        iconPath:'assets/images/home.png',
        selectedIconPath:'assets/images/home.png',
      },
      {
        pagePath:'pages/task/task',
        text:'广场',
        iconPath:'assets/images/task.png',
        selectedIconPath:'assets/images/task.png'
      },
      {
        pagePath:'pages/manage/manage',
        text:'管理',
        iconPath:'assets/images/manage.png',
        selectedIconPath:'assets/images/manage.png'
      },
      {
        pagePath:'pages/message/message',
        text:'消息',
        iconPath:'assets/images/message.png',
        selectedIconPath:'assets/images/message.png',
        badge:`${messageStore.notRead}`
      },
      {
        pagePath:'pages/personal/personal',
        text:'我的',
        iconPath:'assets/images/me.png',
        selectedIconPath:'assets/images/me.png'
      }],
      color: '#323232',
      selectedColor: '#C93E3E'
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
