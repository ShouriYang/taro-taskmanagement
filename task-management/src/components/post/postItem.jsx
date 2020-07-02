import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import {AtToast} from 'taro-ui'
import { observer } from '@tarojs/mobx'
import postStore from '../../store/post'
import './postItem.scss'

@observer
class PostItem extends Component {
  state = {
    getToast:false,
    // star:0,
    beforeStar: 'https://tva1.sinaimg.cn/large/00831rSTgy1gcny7vsy4rj305k05kmx2.jpg',
    afterStar: 'https://tva1.sinaimg.cn/large/00831rSTgy1gcny8glnd5j305k05kt8m.jpg'
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   return nextState.getToast !== this.state.getToast
  // }
  putStar = async () => {
    let {post} = this.props
    const {starList} = postStore
    //判断用户是否点过赞
    if(starList.indexOf(post._id)===-1){
      await this.setState({
        beforeStar: this.state.afterStar
      })
      post.star +=1
      await postStore.putStar(post._id)
      starList.push(post._id)
    }else{
      await this.setState({
        getToast:true
      })
    }
  }
  render() {
    const { post } = this.props
    return (
      <View className='PostItem'>
        <View className='post-title'>{post.title}</View>
        <View className='post-content'>{post.content}</View>
        <View className='post-detail'>
          <View className='post-poster'>投稿人：{post.poster}</View>
        </View>
        <View className='post-footer'>
          <View className='post-date'>{post.createTime}</View>
          <View className='post-star'>
            <Image style={{width:'30px',height:'30px',marginRight:'10px'}} onClick={this.putStar} src={this.state.beforeStar}></Image>
            <View>{post.star}</View>
          </View>
        </View>
        <AtToast isOpened={this.state.getToast} text='您已经点过赞了' icon='close-circle'></AtToast>
      </View>
    );
  }
}

export default PostItem;