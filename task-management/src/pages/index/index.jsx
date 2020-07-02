import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtDivider, AtButton, AtFloatLayout } from 'taro-ui'
import PostItem from '../../components/post/postItem'
import PostForm from '../../components/post/postForm'
import './index.scss'
import manageStore from '../../store/manage'
import postStore from '../../store/post'


@observer
class Index extends Component {
  state = {
    openLayout: false
  }
  async componentDidShow() {
    //获取管理界面的任务订单数量
    await manageStore.getNumber()
    postStore.getPosts();
  }
  config = {
    navigationBarTitleText: '首页'
  }
  //打开新增投稿界面
  changeLayout = async () => {
    await this.setState({
      openLayout: !this.state.openLayout
    })
  }
  //发布投稿
  onSubmit = async () => {
    await postStore.addPost()
    postStore.getPosts();
    this.changeLayout()
  }
  render() {
    return (
      <View className='index'>
        {Taro.getStorageSync('openid') === 'o1Vb-4w1D7HyIkFYD__9ybQu3pNI' ?
          <AtDivider>
            <AtButton type='primary' size='small' onClick={this.changeLayout}>发布投稿</AtButton>
          </AtDivider>
          : ''
        }
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
          postStore.posts.slice().map(post =>
            <PostItem key={post.id} post={post}>
            </PostItem>
          )
        }

        <AtFloatLayout isOpened={this.state.openLayout} title='发布投稿' onClose={this.changeLayout}>
          <PostForm></PostForm>
          <View className='form-btn'>
            <AtButton circle type='primary' onClick={this.onSubmit}>提交投稿</AtButton>
            <AtButton circle type='secondary' onClick={this.changeLayout}>返回列表</AtButton>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}

export default Index 
