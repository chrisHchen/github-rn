import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import UserItem from '../components/UserItem';
import { deviceH, px2dp } from '../utils/index'
import { CommonHeaderHeight } from '../components/CommonHeader'
import {data} from '../data'

const containerHeight = deviceH - px2dp(CommonHeaderHeight) - 20

class Following extends Component{
  static navigationOptions = {
    tabBarLabel: 'FOLLOWINGS'
  }

  constructor(props){
    super(props)
    this.state = {
      data: [],
      isLoading: false,
      isRefreshing: false
    }
    // this.scrollY = 0
    this.contentHeight = 0
    // this.isLoading = false
  }

  componentDidMount() {
    this.setState({
      isRefreshing: true
    })
    setTimeout(() => {
      this.setState({
        data: data,
        isRefreshing: false
      })
    }, 1000)
  }

  loadMore = () => {
    // console.log(1);
    this.setState({
      isLoading: true
    })
    // this.isLoading = true
    setTimeout(() => {
      const newData = this.state.data.concat(data)
      this.setState({
        data: newData,
        isLoading: false
      })
      // this.isLoading = false
    }, 1000)
  }

  _onRefresh = () => {
    this.setState({
      isRefreshing: true
    })
    setTimeout(() => {
      this.setState({
        data: data,
        isRefreshing: false
      })
    }, 1000)
  }

  goDetail = (item) => () => {
    const {navigate} = this.props.navigation
    navigate('UserDetail', {repo: item})
  }

  handleOnScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y
    const {isLoading} = this.state
    // console.log(offsetY + containerHeight, this.contentHeight);
    if(!isLoading && this.contentHeight !==0 && offsetY + containerHeight > this.contentHeight) {
      this.loadMore()
    }
  }

  handleContentSizeChange = (contentWidth, contentHeight) => {
    this.contentHeight = contentHeight
  }

  render() {
    const {isLoading, isRefreshing, data} = this.state
    // In android ActivityIndicator dont work well(dont know why), use opacity to work around
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={this.handleOnScroll}
        scrollEventThrottle={20}
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
            <UserItem item={item} key={index} onPress={this.goDetail(item)}/>
          ))
        }
        {isLoading && <ActivityIndicator animating={isLoading}/>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 30,
    minHeight: containerHeight,
    backgroundColor: '#efefef',
    justifyContent: 'flex-start',
  }
})

export default Following;
