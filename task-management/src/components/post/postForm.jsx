import Taro, { Component } from "@tarojs/taro"
import { View} from "@tarojs/components"
import { observer } from "@tarojs/mobx";
import { AtForm, AtInput, AtTextarea,AtToast } from "taro-ui"
import postStore from '../../store/post';

const { postForm } = postStore
@observer
class PostForm extends Component {
  state = {
    startToast:false,
    toastText:''
  };
    shouldComponentUpdate(nextProps, nextState){
    return nextState.startToast !== this.state.startToast
  }
  onTitle = (e) => {
    postForm.title = e
  }
  onContent =  (e) => {
    if(e.target.value.length>49){
       this.setState({
        toastText:'最多只能输入50个字!'
      })
      this.changeToast()
    }else{
      postForm.content = e.target.value
    }
  }
  onPoster = (e) => {
    postForm.poster = e
  }
  changeToast= async()=>{
    await this.setState({
      startToast:!this.state.startToast
    })
  }
  render() {
    return (
      <View className='post-form' style={{ width: "100%" }}>
        <AtForm>
          <AtInput name='title' title='投稿标题' type='text' placeholder='请输入投稿标题' value={postStore.postForm.title} onChange={this.onTitle} />
          <View style={{fontSize:'36rpx',margin:'24rpx 0 24rpx 35rpx',color:'#333'}}>投稿内容</View>
          <AtTextarea
            color='#333'
            value={postStore.postForm.content}
            onChange={this.onContent}
            maxLength={50}
            count={false}
          />
          <AtInput name='poster' title='投稿者' type='text' placeholder='请输入投稿者' value={postStore.postForm.poster} onChange={this.onPoster} />
        </AtForm>
        <AtToast duration={3000} isOpened={this.state.startToast} text={this.state.toastText} icon='close-circle'></AtToast>
      </View>
    );
  }
}
export default PostForm;
