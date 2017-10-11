import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import EventItem from '../components/EventItem'
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonDetailFrame from '../components/CommonDetailFrame'
import { CommonHeaderHeight } from '../components/CommonHeader'
import {px2dp, deviceH} from '../utils'

class Gists extends Component{

  constructor(props){
    super(props)
    this.state = {
      data: undefined,
      isLoading: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: [],
      })
    }, 1000)
  }

  loadMore = (cb) => {

  }

  showSetting = () => {
    this.props.navigation.navigate('DrawerToggle');
  }

  _renderContent = () => {
    const {data} = this.state
    if(data && data.length === 0){
      return (
        <Text style={styles.noData}>No Data</Text>
      )
    }else if(data && data.length > 0){
      return data.map((item, index) => (
        <EventItem key={index}/>
      ))
    }else{
      return <ActivityIndicator style={{paddingBottom: 20}} animating={true}/>
    }
  }

  render() {
    const { data, isLoading } = this.state
    return (
      <CommonDetailFrame
        navigation={this.props.navigation}
        headerLeft={
          <Icon name="reorder" size={28} color="#fff" onPress={() => this.props.navigation.navigate('DrawerToggle')}/>
        }
        right={
          <Icon name="refresh" size={28} color="#fff"/>
        }
        boldName='Gists'
        ActivityIndicator={
          <ActivityIndicator style={{paddingBottom: 20}} animating={true} style={{opacity: isLoading ? 1: 0}}/>
        }
        onLoadMore={this.loadMore}>
        <View style={{alignItems:'center', minHeight: deviceH - CommonHeaderHeight - 20}}>
          {this._renderContent()}
        </View>
      </CommonDetailFrame>
    );
  }
}

const styles = StyleSheet.create({
  noData: {
    fontSize: 30,
    fontWeight: '700',
    color: '#ccc',
    marginTop: px2dp(46)
  }
})

export default Gists;
