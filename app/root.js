import React, {Component} from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Explore from './screens/Explore'
import Events from './screens/Events'
import MyDrawer from './screens/MyDrawer'
import RepoDetail from './screens/RepoDetail'
import UserDetail from './screens/UserDetail'
import { deviceW } from './utils/index'

const MainDrawerNavigator = DrawerNavigator({
  Explore:{
    screen: Explore,
  },
  Events:{
    screen: Events,
  }
}, {
  drawerWidth: deviceW*0.8,
  contentComponent: props => <MyDrawer {...props} />
})

const MainStackNavigator = StackNavigator({
  MainDrawerNavigator: {
    screen: MainDrawerNavigator
  },
  RepoDetail: {
    screen: RepoDetail
  },
  UserDetail: {
    screen: UserDetail
  }
}, {
  headerMode: 'none'
})

export default MainStackNavigator;
