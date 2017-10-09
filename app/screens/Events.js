import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  RefreshControl,
} from 'react-native';
import CommonHeader from '../components/CommonHeader'
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonDetailFrame from '../components/CommonDetailFrame'

class Events extends Component{

  constructor(props){
    super(props)
    this.state = {
      data: [],
      isLoading: false,
      isRefreshing: true
    }
  }

  componentDidMount() {
    this.setState({
      isRefreshing: true
    })
    setTimeout(() => {
      this.setState({
        data: [0,1,2,3,4,5],
        isRefreshing: false
      })
    }, 1500)
  }

  loadMore = () => {
    this.setState({
      isLoading: true
    })
    const newData = this.state.data
    newData.push(1,1)
    setTimeout(() => {
      this.setState({
        data: newData,
        isLoading: false
      })
    }, 1500)
  }

  _onRefresh = () => {
    this.setState({
      isRefreshing: true
    })
    setTimeout(() => {
      this.setState({
        data: [0,1,2,3,4,5],
        isRefreshing: false
      })
    }, 1500)
  }

  showSetting = () => {
    this.props.navigation.navigate('DrawerToggle');
  }

  render() {
    return (
      <CommonDetailFrame
        navigation={this.props.navigation}
        headerLeft={
          <Icon name="reorder" size={28} color="#fff" onPress={() => this.props.navigation.navigate('DrawerToggle')}/>
        }
        right={
          <Icon name="refresh" size={28} color="#fff"/>
        }
        boldName='Events'
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#bbb"
            style={{flex:1, backgroundColor:'#efefef'}}
            colors={['#ddd', '#0398ff']}
            progressBackgroundColor="#fff"
          />}>
        <View>

        </View>
      </CommonDetailFrame>
    );
  }
}

const styles = StyleSheet.create({

})

export default Events;
