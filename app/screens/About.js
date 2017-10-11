import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import EventItem from '../components/EventItem'
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonHeader, { CommonHeaderHeight } from '../components/CommonHeader'
import InfoBox from '../components/InfoBox'
import { px2dp, deviceH } from '../utils'
import Ionicons from 'react-native-vector-icons/Ionicons';

const data = {
  setting: [{
    title: 'Version',
    value: '1.0.2',
  },{
    title: 'Home Page',
    value: '',
  },{
    title: 'Business Cooperation',
    value: '',
  },{
    title: 'Feedback',
    value: '',
  },{
    title: 'Check for updates',
    value: '',
  }]
}

const imageWidth = px2dp(80)

class About extends Component{

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
      <View style={styles.box}>
        <CommonHeader left={
          <Icon name="arrow-back" size={28} color="#fff" onPress={this.back}/>
        }/>
        <View style={styles.infoBoxWrap}>
          <View style={styles.logoBox}>
            <Ionicons style={{
              borderRadius: imageWidth/2,
              width: imageWidth,
              height: imageWidth,
              textAlign: 'center'
            }} name="logo-github" size={imageWidth} color="#000"/>
          </View>
          <InfoBox data={data.setting} type='strip'/>
          <View style={styles.copyright}>
            <Text style={styles.copyTitle}>Copyright @2017, @chrisHchen</Text>
            <Text style={styles.copyTitle}>All Rights Reserved</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    marginTop: Platform.OS === 'ios' ? 20 : 0
  },
  infoBoxWrap: {
    padding:15,
    alignItems: 'center'
  },
  logoBox: {
    marginBottom: px2dp(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: imageWidth*1.1,
    height: imageWidth*1.1,
    borderRadius: imageWidth*1.1/8
  },
  copyright: {
    alignItems: 'center'
  },
  copyTitle: {
    fontSize: 16,
    color:'#666',
    marginBottom: px2dp(6)
  }
})

export default About;
