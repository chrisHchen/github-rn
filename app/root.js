import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Repository from './pages/Repository'
import User from './pages/User'


const MyApp = TabNavigator({
  Repository: {
    screen: Repository,
  },
  User: {
    screen: User,
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: Platform.OS == "ios" ? '#000' : '#fff',
    labelStyle: {
      fontSize: 12,
    },
    indicatorStyle: {
      backgroundColor:'#ffd700',
    }
  }
});

export default MyApp;
