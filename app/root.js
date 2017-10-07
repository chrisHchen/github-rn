import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar
} from 'react-native';
import { TabNavigator, DrawerNavigator } from 'react-navigation';
import Repository from './screens/Repository'
import User from './screens/User'
import Events from './screens/Events'
import MyDrawer from './screens/MyDrawer'
import Header from './components/Header'
import { deviceW } from './utils/index'

class MyApp extends Component{

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

MyApp.router = MainTabNavigator.router;

const MainDrawerNavigator = DrawerNavigator({
  Explore:{
    screen: MyApp,
  },
  Events:{
    screen: Events,
  }
}, {
  drawerWidth: deviceW*0.8,
  contentComponent: props => <MyDrawer {...props} />
})
export default MainDrawerNavigator;
