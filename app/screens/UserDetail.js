import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Animated,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonDetailFrame, { BG_HEIGHT, HeaderHeight } from '../components/CommonDetailFrame'
import InfoBox from '../components/InfoBox'
import ImageRender from '../components/ImageRender'
import { px2dp, deviceW, deviceH } from '../utils/index'

const noop = () => {}

const data = {
  main:[{
    title: 'Email',
    value: 'chrisHchen@163.com'
  },{
    title: 'Blog',
    value: 'http://chrisHchen.com'
  },{
    title: 'Location',
    value: 'Pittsburge, PA, USA'
  },{
    title: 'Company',
    value: 'ZA.Inc'
  }],
  event:[{
    title: 'Events',
    value: '',
    onPress: noop
  },{
    title: 'Organization',
    value: ''
  },{
    title: 'Starred',
    value: '(12)'
  },{
    title: 'Follwers',
    value: '(18)'
  },{
    title: 'Following',
    value: '(12)'
  }],
  gist:[{
    title: 'Gist',
    value: '(54)'
  },{
    title: 'Repositorys',
    value: '(87)'
  }]
}

class UserDetail extends Component{
  static navigationOptions = {
    title: 'RepoDetail'
  }

  constructor(props){
    super(props)
    this.state = {
      bgScale: 1,
      bgY: 0,
      height: px2dp(BG_HEIGHT)
    }
  }

  componentDidMount(){
    const {scrollY} = this.detailFrame.state
    const _BG_HEIGHT = px2dp(BG_HEIGHT)
    this.setState({
      bgScale: scrollY.interpolate({inputRange: [ -_BG_HEIGHT, 0, _BG_HEIGHT],outputRange: [1.5, 1, 1]}),
      bgY: scrollY.interpolate({inputRange: [ -_BG_HEIGHT, 0, 0],outputRange: [-_BG_HEIGHT, 0, 0]}),
      height: scrollY.interpolate({inputRange: [ -_BG_HEIGHT, 0, 0],outputRange: [_BG_HEIGHT*2 , _BG_HEIGHT, _BG_HEIGHT]})
    })
  }

  _renderHeaderDesc = () => {
    return (
      <Animated.View style={[styles.headerDescContent, {
        // height: this.state.height
      }]}>
        <Animated.Image source={{uri: 'https://avatars2.githubusercontent.com/u/13569505?v=4'}} style={[{
          top:0,
          left:0,
          width: '100%',
          position: 'absolute',
          resizeMode: 'cover'
        },{
            transform: [{ translateY:this.state.bgY },
                        { scale: this.state.bgScale }],
            height: this.state.height
        }]}></Animated.Image>
        <View style={styles.headerDescContent}>
          <View style={{alignItems: 'center', justifyContent:'flex-start', top: px2dp(30)}}>
            <ImageRender
              style={{
                marginRight: 0
              }}
              source={{uri: 'https://avatars2.githubusercontent.com/u/13569505?v=6&s=100'}}
              width={px2dp(80)}/>
            <Text style={{color:"#fff", marginTop: 10, fontSize: 18, textAlign: 'center', backgroundColor: 'transparent'}}>chrisHchen</Text>
          </View>
          <Text style={styles.joinDate}>Join: 2009/03/15</Text>
        </View>
      </Animated.View>
    )
  }

  render() {
    const _HeaderHeight = px2dp(HeaderHeight)
    return (
      <CommonDetailFrame
        ref={(el) => this.detailFrame = el}
        navigation={this.props.navigation}
        headerDesc={this._renderHeaderDesc()}
        headerDescStyle={styles.headerDesc}
        top={0}
        bgColorOutputRange={['transparent' , '#00ccff', '#3399cc', '#3399cc']}
        opacityInputRange={[ 0, _HeaderHeight - 50, _HeaderHeight - 10, _HeaderHeight - 10]}
        boldName='chrisHchen'
        momentumBgColor='transparent'>
        <View>
          <InfoBox data={data.main} type='strip'/>
          <InfoBox data={data.event} />
          <InfoBox data={data.gist} />
        </View>
      </CommonDetailFrame>
    );
  }
}

const styles = StyleSheet.create({
  descContent: {
    color: '#efefef',
    fontSize: 13,
    width: deviceW/3*2,
    marginRight:10,
    marginBottom: 10,
  },
  headerDescContent: {
    height: px2dp(BG_HEIGHT),
    width: deviceW,
    position: 'relative',
  },
  headerDesc: {
    justifyContent:'flex-start',
    width: deviceW,
    height: px2dp(BG_HEIGHT),
    position:'absolute',
  },
  joinDate: {
    color: '#fff',
    fontSize: 13,
    position:'absolute',
    bottom: px2dp(10),
    backgroundColor: 'transparent',
    right: 15,
    zIndex: 10,
  }
})

export default UserDetail;
