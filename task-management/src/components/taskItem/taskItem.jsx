import Taro, { Component } from '@tarojs/taro'
import {View,Text} from '@tarojs/components'

import './taskItem.scss'

class TaskItem extends Component {
    state = {  }
    render() { 
        const {task} = this.props
        return ( 
            <View className='TaskItem'>
                <View className='task-title'>{task.title}</View>
                <View className='task-description'>{task.description}</View>
                <View className='task-detail'>
                    <View className='task-director'>监督：{task.director}</View>
                    <View className='task-producer'>制作人：{task.producer}</View>
                </View>
                <View className='task-footer'>
                    <View className='task-date'>年份：{task.release_date}</View>
                    <View className='task-score'><Text className='iconfont task-star-o'></Text>{task.rt_score}</View>
                </View>
            </View>
         );
    }
}
 
export default TaskItem;