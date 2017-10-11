import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import EventItem from '../components/EventItem'
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonDetailFrame from '../components/CommonDetailFrame'
import { CommonHeaderHeight } from '../components/CommonHeader'
import InfoBox from '../components/InfoBox'
import { px2dp, deviceH } from '../utils'

const data = {
  setting: [{
    title: 'Favourite Language',
    value: '',
    rightIcon: <Icon name="dvr" size={px2dp(22)} color="#666"/>
  },{
    title: 'Favourite Launcher',
    value: '',
    rightIcon: <Icon name="send" size={px2dp(22)} color="#666"/>
  },{
    title: 'Theme',
    value: '',
    rightIcon: <Icon name="flight-land" size={px2dp(22)} color="#666"/>
  },{
    title: 'Share',
    value: '',
    rightIcon: <Icon name="share" size={px2dp(22)} color="#666"/>
  },{
    title: 'Clear Cache',
    value: '',
    rightIcon: <Icon name="multiline-chart" size={px2dp(22)} color="#666"/>
  }],
  licenses: [{
    title: 'Open Source Licenses',
    value: '',
  }],
  signout: [{
    title: 'Sign out',
    value: '',
  }]
}

class Setting extends Component{

  constructor(props){
    super(props)
    this.backRouterName = null
  }

  componentDidMount() {
    const {state} = this.props.navigation;
    this.backRouterName = state.params && state.params.backRouterName
  }

  componentWillUnmount() {
    this.backRouterName = null
  }

  loadMore = (cb) => {

  }

  back = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'MainDrawerNavigator',
      action: NavigationActions.navigate({
        routeName: this.backRouterName
      })
    })
    this.props.navigation.dispatch(navigateAction)
  }

  render() {
    return (
      <CommonDetailFrame
        navigation={this.props.navigation}
        headerLeft={
          <Icon name="arrow-back" size={28} color="#fff" onPress={this.back}/>
        }

        boldName='Setting'
        onLoadMore={this.loadMore}>
        <View style={{minHeight: deviceH - CommonHeaderHeight - 20}}>
          <InfoBox data={data.setting}/>
          <InfoBox data={data.licenses}/>
          <InfoBox data={data.signout}/>
        </View>
      </CommonDetailFrame>
    );
  }
}

const styles = StyleSheet.create({

})

export default Setting;
