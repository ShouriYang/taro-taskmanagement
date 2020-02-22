import Taro, { Component } from '@tarojs/taro'
import {View,Text} from '@tarojs/components'

import './postItem.scss'

class PostItem extends Component {
    state = {  }
    render() { 
        const {post} = this.props
        return ( 
            <View className='PostItem'>
                <View className='post-title'>{post.title}</View>
                <View className='post-description'>{post.description}</View>
                <View className='post-detail'>
                    <View className='post-director'>监督：{post.director}</View>
                    <View className='post-producer'>制作人：{post.producer}</View>
                </View>
                <View className='post-footer'>
                    <View className='post-date'>年份：{post.release_date}</View>
                    <View className='post-score'><Text className='task task-star-o'></Text>{post.rt_score}</View>
                </View>
            </View>
         );
    }
}
 
export default PostItem;