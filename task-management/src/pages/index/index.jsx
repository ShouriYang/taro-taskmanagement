import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtPagination } from 'taro-ui'

import PostItem from '../../components/post/postItem'
import './index.scss'

@inject('postStore')
@observer
class Index extends Component {
  state = {

  }
  componentDidMount() {
    // Taro.switchTab({
    //   url:'/pages/task/task'
    // })
    const { postStore } = this.props
    postStore.getPosts();
  }
  config = {
    navigationBarTitleText: '首页'
  }

  render() {
    const { postStore: { posts } } = this.props
    console.log(posts)
    return (
      <View className='index'>
        <Swiper
          className='index-swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
        >
          <SwiperItem>
            <View className='index-swiper-1'><Image src='https://tva1.sinaimg.cn/large/0082zybpgy1gc5h631nxnj32dp0u0e81.jpg'></Image></View>
          </SwiperItem>
          <SwiperItem>
            <View className='index-swiper-2'><Image src='https://tva1.sinaimg.cn/large/0082zybpgy1gc5h6wkg6xj31e00io4qp.jpg'></Image></View>
          </SwiperItem>
          <SwiperItem>
            <View className='index-swiper-3'><Image src='https://tva1.sinaimg.cn/large/0082zybpgy1gc5h7e8kzkj31ab0hahc9.jpg'></Image></View>
          </SwiperItem>
        </Swiper>
        {
          posts.slice().map(post =>
            <PostItem key={post.id} post={post}>
            </PostItem>
          )
        }
        <AtPagination
          className='index-pagi'
          icon
          total={50}
          pageSize={10}
          current={1}
        >
        </AtPagination>
      </View>
    )
  }
}

export default Index 
