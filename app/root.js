import React, {Component} from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Explore from './screens/Explore'
import Events from './screens/Events'
import MyDrawer from './screens/MyDrawer'
import RepoDetail from './screens/RepoDetail'
import MyRepo from './screens/MyRepo'
import Follow from './screens/Follow'
import Starred from './screens/Starred'
import Issues from './screens/Issues'
import Gists from './screens/Gists'
import Setting from './screens/Setting'
import About from './screens/About'
import UserDetail from './screens/UserDetail'
import { deviceW } from './utils/index'

const MainDrawerNavigator = DrawerNavigator({
  Explore:{
    screen: Explore,
  },
  Events:{
    screen: Events,
  },
  Repository:{
    screen: MyRepo,
  },
  Follow:{
    screen: Follow,
  },
  Starred:{
    screen: Starred,
  },
  Issues:{
    screen: Issues,
  },
  Gists:{
    screen: Gists,
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
  },
  Setting:{
    screen: Setting,
  },
  About:{
    screen: About,
  }
}, {
  headerMode: 'none',
})

export default MainStackNavigator;
