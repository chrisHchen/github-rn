import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonHeader from '../components/CommonHeader'
import Following from './Following'
import Follower from './Follower'

class Follow extends Component{

  render() {
    return (
      <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 20:0}}>
        <StatusBar
          backgroundColor="#3399cc"
          barStyle="dark-content"
        />
        <CommonHeader
          left={
            <Icon name="reorder" size={28} color="#fff" onPress={() => this.props.navigation.navigate('DrawerToggle')}/>
          }/>
        <FollowTabNavigator navigation={this.props.navigation}/>
      </View>
    )
  }
}

const FollowTabNavigator = TabNavigator({
  FOLLOWINGS: {
    screen: Following,
  },
  FOLLOWERS: {
    screen: Follower,
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
      borderTopWidth: 0
    },
    labelStyle: {
      fontSize: 14,
      marginBottom: Platform.OS === 'ios' ? 14 : 0,
      fontWeight: '700'
    },
  }
});

Follow.router = FollowTabNavigator.router;

export default Follow;
