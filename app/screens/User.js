import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from 'react-native';
import UserItem from '../components/UserItem';
import { deviceH, px2dp } from '../utils/index'
import { HEADER_HEIGHT } from '../components/Header'

const containerHeight = deviceH - px2dp(HEADER_HEIGHT) - 20

class User extends Component{
  static navigationOptions = {
    tabBarLabel: 'USER'
  };

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
    }, 1000)
  }

  loadMore = () => {
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      const newData = this.state.data
      newData.push(1,1)
      this.setState({
        data: newData,
        isLoading: false
      })
    }, 1000)
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

  goDetail = () => {
    const {navigate} = this.props.navigation
    navigate('UserDetail', {name: 'x'})
  }

  handleOnScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y
    const { isLoading } = this.state
    // console.log(offsetY + containerHeight, this.contentHeight);
    if(!isLoading && this.contentHeight !==0 && offsetY + containerHeight > this.contentHeight) {
      // console.log('yes');
      this.loadMore()
    }
  }

  handleContentSizeChange = (contentWidth, contentHeight) => {
    this.contentHeight = contentHeight
  }

  render() {
    const {isLoading, isRefreshing, data} = this.state
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={this.handleOnScroll}
        contentContainerStyle={styles.container}
        style={{backgroundColor: '#efefef'}}
        overScrollMode='always'
        onContentSizeChange={this.handleContentSizeChange}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#bbb"
            style={{flex:1, backgroundColor:'#efefef'}}
            colors={['#ddd', '#0398ff']}
            progressBackgroundColor="#fff"
          />}>
        {
          data.map((item, index) => (
            <UserItem key={index} onPress={this.goDetail}/>
          ))
        }
        {<ActivityIndicator style={{paddingBottom: 20}} animating={true} style={{opacity: isLoading ? 1: 0}}/>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    minHeight: containerHeight,
    backgroundColor: '#efefef',
    justifyContent: 'flex-start',
  }
})

export default User;
