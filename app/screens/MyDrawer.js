import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import { px2dp } from '../utils/index'
import ImageRender from '../components/ImageRender'

const data = [{
  name: 'Explore',
  icon: 'search'
},{
  name: 'Events',
  icon: 'textsms'
},{
  name: 'Repository',
  icon: 'view-carousel'
},{
  name: 'Follow',
  icon: 'people'
},{
  name: 'Starred',
  icon: 'star'
},{
  name: 'Issues',
  icon: 'assignment'
},{
  name: 'Gists',
  icon: 'label'
},{
  name: 'Setting',
  icon: 'settings'
},{
  name: 'About',
  icon: 'info-outline'
}]

class MyDrawer extends Component{
  constructor(props){
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      bgScale: 1,
      bgY: 0,
      height: px2dp(220),
    }
    this.lastRouteName = undefined
  }

  componentDidMount(){
    let marginTop = px2dp(220)
    let { scrollY } = this.state
    this.setState({
      bgScale: scrollY.interpolate({inputRange: [ -marginTop, 0, marginTop],outputRange: [1.5, 1, 1]}),
      bgY: scrollY.interpolate({inputRange: [ -marginTop, 0, marginTop],outputRange: [-marginTop, 0, marginTop]}),
      height: scrollY.interpolate({inputRange: [ -marginTop, 0],outputRange: [marginTop*2 , marginTop]})
    })
  }

  componentWillUnmount() {
    this.lastRouteName = null
  }

  handlePress = (d) => () => {
    const {navigation} = this.props
    const lastRouteName = this.lastRouteName
    this.lastRouteName = d.name
    if(typeof navigation.navigate === 'function'){
      // navigation.navigate('DrawerClose')
      navigation.navigate(d.name, {backRouterName: lastRouteName})
    }
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <Animated.Image source={{uri: 'https://avatars2.githubusercontent.com/u/13569505?v=4'}} style={[{
          width: '100%',
          resizeMode: 'cover'
        },{
            transform: [{ translateY: this.state.bgY },
                        { scale: this.state.bgScale }],
            height: this.state.height
        }]}></Animated.Image>
        <View style={styles.headerInner}>
          <ImageRender width={60} source={{uri: 'https://avatars2.githubusercontent.com/u/13569505?v=4&s=100'}} style={{marginBottom: 10}}/>
          <Text style={{backgroundColor:'transparent', color: '#fff', marginBottom: 5}}>chrisHchen</Text>
          <Text style={{backgroundColor:'transparent', color: '#bbb'}}>Join: 2017/07/30</Text>
        </View>
      </View>
    )
  }

  render() {
    const {activeItemKey} = this.props
    // console.log(navigation);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginTop: (Platform.OS === 'ios' ? 20 : 0)}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
        )}
        scrollEventThrottle={16}>
        {this._renderHeader()}
        {
          data.map((d, index) => {
            const isActive = d.name === activeItemKey
            return (
              <Button key={index} onPress={this.handlePress(d)}>
                <View style={[styles.drawerItem, {backgroundColor: isActive ? '#eee':'#fff'}]}>
                  <Icon style={styles.icon} name={d.icon} size={24} color={isActive ? '#000':'#999'}/>
                  <Text style={{fontSize: 16, color: isActive ? '#3399cc':'#000'}}>{d.name}</Text>
                </View>
              </Button>
            )
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: px2dp(52),
  },
  icon: {
    marginRight: 15
  },
  header: {
    height: px2dp(220),
    position: 'relative',
  },
  headerInner: {
    position: 'absolute',
    left: 15,
    bottom: 15,
    backgroundColor: 'transparent',
  }
})

export default MyDrawer;
