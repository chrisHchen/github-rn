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

class CommonDetailFrame extends Component{

  constructor(props){
    super(props)
    const { cancelBgColorAnim } = this.props
    this.state = {
      scrollY: new Animated.Value(0),
      translateY: 0,
      transHeaderBar: 0,
      translateX: 0,
      scale: 1,
      opacity: 1,
      backgroundColor: cancelBgColorAnim ? 'transparent' : '#00ccff',
      top: this.props.top === undefined ? px2dp(CommonHeaderHeight) : this.props.top,
      // height: px2dp(BG_HEIGHT),
    }
    this.startColor = cancelBgColorAnim ? 'transparent' : '#00ccff'
    this.toColor = cancelBgColorAnim ? 'transparent' : '#3399cc'
  }

  componentDidMount(){
    let { scrollY, top } = this.state
    const _HeaderHeight = px2dp(HeaderHeight)
    const _CommonHeaderHeight = px2dp(CommonHeaderHeight)
    const bgColorInputRange = this.props.bgColorInputRange || [ 0, _HeaderHeight - 15, _HeaderHeight - 10, _HeaderHeight - 10]
    const bgColorOutputRange = this.props.bgColorOutputRange || [this.startColor , this.startColor, this.toColor, this.toColor]
    const opacityInputRange = this.props.opacityInputRange || [ 0, 0, _HeaderHeight - 15, _HeaderHeight - 15]
    this.setState({
      translateY: scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight, _HeaderHeight], outputRange: [0 ,0 , -_HeaderHeight, -_HeaderHeight]}),
      transHeaderBar : scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight, _HeaderHeight], outputRange: [0, 0 , _HeaderHeight, _HeaderHeight]}),
      translateX : scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight, _HeaderHeight], outputRange: [0, 0 , px2dp(25), px2dp(25)]}),
      scale : scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight, _HeaderHeight], outputRange: [1, 1 , 0.7, 0.7]}),
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
      animHeaderBg : cancelBgColorAnim ? {
        transform: [{ translateY: this.state.translateY }],
      } : {
        backgroundColor: this.state.backgroundColor,
        transform: [{ translateY: this.state.translateY }],
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
        <Animated.View style={[styles.commonHeader,{
          transform: [{ translateY: this.state.transHeaderBar }],
        }]}>
          <CommonHeader
            left={
              this.props.headerLeft ||
              <Icon name="arrow-back" size={28} color="#fff" onPress={this.leftPress}/>
            }
            right={
              this.props.headerRight ||
              <Icon name="share" size={28} color="#fff" onPress={this.rightPress}/>
            }
            style={{backgroundColor: 'transparent'}}/>
        </Animated.View>
        {
          this.props.headerDesc &&
          <Animated.View style={[this.props.headerDescStyle, style.animHeaderDesc]}>
            {this.props.headerDesc}
          </Animated.View>
        }
        <Animated.View style={[styles.repoName, style.animRepoName]}>
          <Text style={{color:'#fff', fontSize: 30, fontWeight: '600', backgroundColor: 'transparent'}}>{this.props.boldName}</Text>
        </Animated.View>
      </Animated.View>
    )
  }

  render() {
    return (
      <View style={styles.box}>
          {this._renderHeaderBg()}
          <Animated.View
            style={[styles.topView, {
              transform: [{ translateY: this.state.translateY }]
            }]}>
            <ScrollView
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
              )}
              contentContainerStyle={{minHeight:deviceH + BG_HEIGHT*2, padding: 15}}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}>
              <Animated.View style={{
                transform: [{translateY: this.state.transHeaderBar}],
              }}>
                { this.props.children }
              </Animated.View>
            </ScrollView>
          </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    marginTop: (Platform.OS === 'ios' ? 20 : 0),
    position: 'relative',
  },
  headerBg: {
    position: 'relative',
    overflow: 'hidden',
    height: px2dp(BG_HEIGHT)
  },
  commonHeader: {
    backgroundColor: 'transparent',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    zIndex: 100,
  },
  repoName: {
    position: 'absolute',
    bottom: px2dp(5),
    left: 15,
  },
})

export default CommonDetailFrame;
