import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Header, {HEADER_HEIGHT} from '../components/Header'
import Repository from './Repository'
import User from './User'
import {px2dp, deviceW} from '../utils'


export const TAB_HEIGHT = 60

class Explore extends Component{

  constructor(props){
    super(props)
    this.state = {
      isRefreshing: false,
      isSearching: false,
    }
  }

  handleRefresh = () => {
    if(this.state.isRefreshing) return
    this.setState({
      isRefreshing: true
    })
  }

  reFreshCb = () => {
    this.setState({
      isRefreshing: false
    })
  }

  handleSearch = () => {
    this.setState({
      isSearching: true
    })
  }

  render() {
    const {isRefreshing, isSearching} = this.state
    const screenProps = {
      isRefreshing,
      reFreshCb: this.reFreshCb,
    }
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <StatusBar
          backgroundColor="#3399cc"
          barStyle="dark-content"
        />
        <Header
          navigation={this.props.navigation}
          onRefresh={this.handleRefresh}
          isRefreshing={isRefreshing}
          onSearch={this.handleSearch}
          isSearching={isSearching}
        />
        <MainTabNavigator
          navigation={this.props.navigation}
          screenProps={screenProps}/>
        {isRefreshing && <ActivityIndicator style={styles.indicator} animating={isRefreshing} size='large' />}
      </View>
    )
  }
}

const MainTabNavigator = TabNavigator({
  REPOSITORY: {
    screen: Repository,
  },
  USER: {
    screen: User,
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    upperCaseLabel: true,
    activeTintColor: '#fff',
    inactiveTintColor: 'rgba(255,255,255,.7)',
    labelStyle: {
      fontSize: 12,
    },
    indicatorStyle: {
      backgroundColor:'#ffd700',
    },
    style: {
      backgroundColor: '#00ccff',
      borderTopWidth: 0,
      flex: 0, // set this to 0
      height: px2dp(TAB_HEIGHT),
      width: deviceW,
      justifyContent: 'flex-end'
    },
    labelStyle: {
      fontSize: 14,
      paddingBottom: Platform.OS === 'ios' ? 14 : 0,
      fontWeight: '700',
      // flex: 1,
    },
    tabStyle: {
      alignItems: 'center',
      justifyContent: 'flex-end'
      // height: px2dp(TAB_HEIGHT),
    }
  }
});

Explore.router = MainTabNavigator.router;

const styles = StyleSheet.create({
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 100,
    top: px2dp(TAB_HEIGHT + HEADER_HEIGHT + 50)
  },
})

export default Explore;
