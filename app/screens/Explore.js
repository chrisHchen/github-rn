import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Header from '../components/Header'
import Repository from './Repository'
import User from './User'

class Explore extends Component{

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="#3399cc"
          barStyle="dark-content"
        />
        <Header navigation={this.props.navigation}/>
        <MainTabNavigator navigation={this.props.navigation}/>
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
      borderTopWidth: 0
    },
    labelStyle: {
      fontSize: 14,
      marginBottom: Platform.OS === 'ios' ? 14 : 0,
      fontWeight: '700'
    },
  }
});

Explore.router = MainTabNavigator.router;

export default Explore;
