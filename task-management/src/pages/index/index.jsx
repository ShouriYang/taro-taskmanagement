import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import PostItem from '../../components/postItem/postItem'
import './index.scss'
import swipper1 from '../../assets/images/swipper-1.jpg'
import swipper2 from '../../assets/images/swipper-2.jpg'
import swipper3 from '../../assets/images/swipper-3.jpg'

@inject('postStore')
@observer
class Index extends Component {
  state = {

  }

  componentDidMount() {
    const { postStore } = this.props
    postStore.getPosts();
  }
  config = {
    navigationBarTitleText: '首页'
  }

  render() {
    const { postStore: { posts } } = this.props
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
            <View className='index-swiper-1'><Image src={swipper1}></Image></View>
          </SwiperItem>
          <SwiperItem>
            <View className='index-swiper-2'><Image src={swipper2}></Image></View>
          </SwiperItem>
          <SwiperItem>
            <View className='index-swiper-3'><Image src={swipper3}></Image></View>
          </SwiperItem>
        </Swiper>
        {
          posts.slice().map(post =>
            <PostItem key={post.id} post={post}>
            </PostItem>
          )
        }
      </View>
    )
  }
}

export default Index 
