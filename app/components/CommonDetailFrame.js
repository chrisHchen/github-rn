import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonHeader, { CommonHeaderHeight } from '../components/CommonHeader'
import { px2dp, deviceW, deviceH } from '../utils/index'

export const HeaderHeight = 160
export const BG_HEIGHT = HeaderHeight + CommonHeaderHeight
export const containerHeight = deviceH - 20

const offsetBottom = 20 // offset at the bottom for loadMore to start
const translateX = 25
const scale = 0.7

class CommonDetailFrame extends Component{

  constructor(props){
    super(props)
    const { cancelBgColorAnim } = this.props
    this.state = {
      scrollY: new Animated.Value(0),
      // translateY: 0,
      // transHeaderBar: 0,
      translateX: 0,
      scale: 1,
      opacity: 1,
      backgroundColor: cancelBgColorAnim ? 'transparent' : '#00ccff',
      top: this.props.top === undefined ? px2dp(CommonHeaderHeight) : this.props.top,
      // isLoading: false,
      isStaticHeaderShow: false,
      ScrollViewBgColor: '#eee', // for ios momentum scroll
    }
    this.startColor = cancelBgColorAnim ? 'transparent' : '#00ccff'
    this.toColor = cancelBgColorAnim ? 'transparent' : '#3399cc'

    this.contentHeight = 0
    this.isLoading = false
    this.momentumBgColor = this.props.momentumBgColor || '#00ccff' // for ios momentum scroll
  }

  componentDidMount(){
    let { scrollY, top } = this.state
    const _HeaderHeight = px2dp(HeaderHeight)
    const _CommonHeaderHeight = px2dp(CommonHeaderHeight)
    const bgColorInputRange = this.props.bgColorInputRange || [ 0, _HeaderHeight - 15, _HeaderHeight - 10, _HeaderHeight - 10]
    const bgColorOutputRange = this.props.bgColorOutputRange || [this.startColor , this.startColor, this.toColor, this.toColor]
    const opacityInputRange = this.props.opacityInputRange || [ 0, 0, _HeaderHeight - 15, _HeaderHeight - 15]
    const _translateX = px2dp(translateX)
    this.setState({
      // translateY: scrollY.interpolate({inputRange: [ 0, _HeaderHeight, _HeaderHeight + 100], outputRange: [0 , 0 , 100]}),
      // transHeaderBar : scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight, _HeaderHeight], outputRange: [0, 0 , _HeaderHeight, _HeaderHeight]}),
      translateX : scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight, _HeaderHeight], outputRange: [0, 0 , _translateX, _translateX]}),
      scale : scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight, _HeaderHeight], outputRange: [1, 1 , scale, scale]}),
      opacity : scrollY.interpolate({inputRange: opacityInputRange, outputRange: [1, 1 , 0, 0]}),
      top : scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight], outputRange: [top, top, top  + px2dp(80)]}),
      backgroundColor : scrollY.interpolate({inputRange: bgColorInputRange, outputRange: bgColorOutputRange}),
      // height: scrollY.interpolate({inputRange: [ 0, px2dp(BG_HEIGHT)], outputRange: [px2dp(BG_HEIGHT) , 0]})
    })
  }

  leftPress = () => {
    if(this.props.navigation && typeof this.props.navigation.goBack === 'function'){
      this.props.navigation.goBack()
    }
  }

  rightPress = () => {

  }

  _renderHeaderBg = () => {
    const { cancelBgColorAnim, cancelOpacity } = this.props
    const style = {
      animHeaderBg: cancelBgColorAnim ? {
      } : {
        backgroundColor: this.state.backgroundColor,
      },
      animHeaderDesc: cancelOpacity ? {
        top: this.state.top,
      } : {
        opacity: this.state.opacity,
        top: this.state.top,
      },
      animRepoName: {
        transform: [{ translateX: this.state.translateX },
                    { scale: this.state.scale}],
      }
    }

    return (
      <Animated.View style={[styles.headerBg, style.animHeaderBg]}>
        {
          this.props.headerDesc &&
          <Animated.View style={[this.props.headerDescStyle, style.animHeaderDesc]}>
            {this.props.headerDesc}
          </Animated.View>
        }
        <Animated.View style={[styles.repoName, style.animRepoName]}>
          <Text style={styles.originalText}>{this.props.boldName}</Text>
        </Animated.View>
      </Animated.View>
    )
  }

  _renderCommonHeader = () => {
    const { isStaticHeaderShow } = this.state

    return (
      <CommonHeader
        left={
          this.props.headerLeft ||
          <Icon name="arrow-back" size={28} color="#fff" onPress={this.leftPress}/>
        }
        right={
          this.props.headerRight ||
          <Icon name="share" size={28} color="#fff" onPress={this.rightPress}/>
        }
        style={[styles.commonHeader,{
          opacity:  isStaticHeaderShow ? 0 : 1
        }]}
      />
    )
  }

  _renderStaticHeader = () => {
    const { isStaticHeaderShow } = this.state
    return (
      <CommonHeader
        left={
          <View style={{flexDirection: 'row', alignItems: 'center', position:'relative'}}>
            {this.props.headerLeft || <Icon name="arrow-back" size={28} color="#fff" onPress={this.leftPress}/>}
            <Text style={[styles.originalText, {
              transform:[{translateX: px2dp(translateX)},
                        {scale: scale}],
              position:'absolute',
            }]}>{this.props.boldName}</Text>
          </View>
        }
        right={
          this.props.headerRight ||
          <Icon name="share" size={28} color="#fff" onPress={this.rightPress}/>
        }
        style={[styles.staticCommonHeader,{
          backgroundColor:  isStaticHeaderShow ? '#3399cc' : 'transparent',
          opacity:  isStaticHeaderShow ? 1 : 0
        }]}
      />
    )
  }

  handleOnScroll = (event) => {
    const { isStaticHeaderShow, ScrollViewBgColor } = this.state

    Animated.event(
      [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
    )(event)

    const offsetY = event.nativeEvent.contentOffset.y
    // console.log(offsetY);
    if(offsetY >= px2dp(HeaderHeight) && !isStaticHeaderShow){
      this.setState({
        isStaticHeaderShow: true
      })
    } else if(offsetY < px2dp(HeaderHeight) && isStaticHeaderShow){
      this.setState({
        isStaticHeaderShow: false
      })
    }

    if(offsetY <= 0 && ScrollViewBgColor === '#eee' ) {
      this.setState({
        ScrollViewBgColor: this.momentumBgColor
      })
    } else if (offsetY > 0 && ScrollViewBgColor === this.momentumBgColor ) {
      this.setState({
        ScrollViewBgColor: "#eee"
      })
    }

    // console.log(offsetY, offsetY + containerHeight, this.contentHeight);
    if(!this.isLoading && this.contentHeight !==0 && offsetY + containerHeight >= this.contentHeight - offsetBottom) {
      this.isLoading = true
      this.props.onLoadMore && this.props.onLoadMore(() => {
        this.isLoading = false
      })
    }
  }

  handleContentSizeChange = (contentWidth, contentHeight) => {
    this.contentHeight = contentHeight
  }

  render() {
    const  { ScrollViewBgColor } = this.state
    return (
      <View style={styles.box}>
          {this._renderStaticHeader()}
          {this._renderCommonHeader()}
          <ScrollView
            style={{flex:1, backgroundColor: ScrollViewBgColor}}
            onScroll={this.handleOnScroll}
            contentContainerStyle={{justifyContent: 'flex-start'}}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onContentSizeChange={this.handleContentSizeChange}
            >
              {this._renderHeaderBg()}
              <View style={{padding: 15, backgroundColor: '#eee'}}>
                { this.props.children }
              </View>
              {this.props.ActivityIndicator}
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    marginTop: (Platform.OS === 'ios' ? 20 : 0),
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-start'
  },
  headerBg: {
    position: 'relative',
    // overflow: 'hidden',
    height: px2dp(BG_HEIGHT)
  },
  commonHeader: {
    backgroundColor: 'transparent',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    zIndex: 11,
  },
  staticCommonHeader: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    zIndex: 11,
  },
  originalText: {
    color:'#fff',
    fontSize: 30,
    fontWeight: '600',
    backgroundColor: 'transparent'
  },
  repoName: {
    position: 'absolute',
    bottom: px2dp(5),
    left: 15,
  },
})

export default CommonDetailFrame;
