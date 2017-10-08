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
import ImageRender from '../components/ImageRender'
import { px2dp, deviceW, deviceH } from '../utils/index'

const HeaderHeight = 160
const BG_HEIGHT = HeaderHeight + CommonHeaderHeight

const data = {
  main:[{
    title: 'Owner',
    value: 'ReactiveX'
  },{
    title: 'Last Updated',
    value: '2017/10/08'
  },{
    title: 'Language',
    value: 'Java'
  },{
    title: 'Authority',
    value: 'Public'
  },{
    title: 'Capacity',
    value: '43.0MB'
  }],
  event:[{
    title: 'Events',
    value: ''
  },{
    title: 'Issues',
    value: '(40)'
  },{
    title: 'Stargazers',
    value: '(27739)'
  },{
    title: 'Contributors',
    value: '(10)'
  },{
    title: 'Forks',
    value: '(4882)'
  }],
  code:[{
    title: 'Code',
    value: ''
  }]
}

class RepoDetail extends Component{
  static navigationOptions = {
    title: 'RepoDetail'
  }

  constructor(props){
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      translateY: 0,
      transHeaderBar: 0,
      translateX: 0,
      scale: 1,
      opacity: 1,
      backgroundColor: '#00ccff',
      top: px2dp(CommonHeaderHeight),
      // height: px2dp(BG_HEIGHT),
    }
  }

  componentDidMount(){
    let { scrollY } = this.state
    const _CommonHeaderHeight = px2dp(CommonHeaderHeight)
    const _HeaderHeight = px2dp(HeaderHeight)
    this.setState({
      translateY: scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight, _HeaderHeight], outputRange: [0 ,0 , -_HeaderHeight, -_HeaderHeight]}),
      transHeaderBar : scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight, _HeaderHeight], outputRange: [0, 0 , _HeaderHeight, _HeaderHeight]}),
      translateX : scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight, _HeaderHeight], outputRange: [0, 0 , px2dp(25), px2dp(25)]}),
      scale : scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight, _HeaderHeight], outputRange: [1, 1 , 0.7, 0.7]}),
      opacity : scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight - 15, _HeaderHeight - 15], outputRange: [1, 1 , 0, 0]}),
      top : scrollY.interpolate({inputRange: [ 0, 0, _HeaderHeight], outputRange: [_CommonHeaderHeight, _CommonHeaderHeight, _CommonHeaderHeight  + px2dp(80)]}),
      backgroundColor : scrollY.interpolate({inputRange: [ 0, _HeaderHeight - 15, _HeaderHeight - 10, _HeaderHeight - 10], outputRange: ['#00ccff' , '#00ccff', '#3399cc', '#3399cc']}),
      // height: scrollY.interpolate({inputRange: [ 0, px2dp(BG_HEIGHT)], outputRange: [px2dp(BG_HEIGHT) , 0]})
    })
  }

  _renderHeaderBg = () => {
    return (
      <Animated.View style={[styles.headerBg, {
        backgroundColor: this.state.backgroundColor,
        transform: [{ translateY: this.state.translateY }],
      }]}>
        <Animated.View style={[styles.commonHeader,{
          transform: [{ translateY: this.state.transHeaderBar }],
        }]}>
          <CommonHeader
            left={
            <Icon name="arrow-back" size={28} color="#fff" onPress={() => this.props.navigation.goBack()}/>
            }
            right={
              <Icon name="share" size={28} color="#fff"/>
            }
            style={{backgroundColor: 'transparent'}}/>
        </Animated.View>

        <Animated.View style={[styles.headerDesc, {
          opacity: this.state.opacity,
          top: this.state.top,
        }]}>
          <View style={{flexDirection: 'row', width: deviceW, justifyContent: 'space-between', alignItems: 'center'}}>
            <View>
              <Text numberOfLines={5} style={styles.descContent}>
                Used to truncate the text with an ellipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.
              </Text>
              <Text style={{color: '#efefef'}}>Create at 2017/02/11</Text>
            </View>
            <ImageRender
              source={{uri: 'https://avatars2.githubusercontent.com/u/13569505?v=6&s=100'}}
              width={deviceW/3 - 46}/>
          </View>
        </Animated.View>
        <Animated.View style={[styles.repoName,{
          transform: [{ translateX: this.state.translateX },
                      { scale: this.state.scale}],
        }]}>
          <Text style={{color:'#fff', fontSize: 30, fontWeight: '600'}}>RxJava</Text>
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
                <View style={styles.dataBox}>
                  {
                    data.main.map((d, index) => (
                      <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
                        <View style={styles.dataItem}>
                          <Text style={{marginRight: 10}}>{d.title}</Text>
                          <Text>{d.value}</Text>
                        </View>
                        <View style={styles.strip}></View>
                      </View>
                    ))
                  }
                </View>
                <View style={styles.dataBox}>
                  {
                    data.event.map((d, index) => (
                      <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
                        <View style={styles.dataItem}>
                          <Text style={{marginRight: 10}}>{d.title}</Text>
                          <Text>{d.value}</Text>
                        </View>
                        <Icon style={styles.arrow} name="keyboard-arrow-right" size={16} color="#000"/>
                      </View>
                    ))
                  }
                </View>
                <View style={styles.dataBox}>
                  {
                    data.code.map((d, index) => (
                      <View style={{flexDirection: 'row', alignItems: 'center'}} key={index} >
                        <View style={styles.dataItem}>
                          <Text style={{marginRight: 10}}>{d.title}</Text>
                          <Text>{d.value}</Text>
                        </View>
                        <Icon style={styles.arrow} name="keyboard-arrow-right" size={16} color="#000"/>
                      </View>
                    ))
                  }
                </View>
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
    zIndex: 10,
  },
  headerDesc: {
    flexDirection: 'column',
    width: deviceW,
    paddingHorizontal: 15,
    position:'absolute',
  },
  descContent: {
    color: '#efefef',
    fontSize: 13,
    width: deviceW/3*2,
    marginRight:10,
    marginBottom: 10,
  },
  repoName: {
    position: 'absolute',
    bottom: px2dp(5),
    left: 15,
  },
  dataBox: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dataItem: {
    marginLeft: px2dp(20),
    flexDirection: 'row',
    height: px2dp(40),
    justifyContent:'flex-start',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    position: 'relative',
    overflow: 'visible'
  },
  strip: {
    position: 'absolute',
    width: 2,
    backgroundColor: '#ffcc33',
    height: px2dp(26),
    left: 0,
  },
  arrow: {
    position: 'absolute',
    left: 0
  }
})

export default RepoDetail;
