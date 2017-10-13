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
import {data} from '../data'

const containerHeight = deviceH - px2dp(HEADER_HEIGHT) - 20
const LOADING_OFFSET = 60

class User extends Component{
  static navigationOptions = {
    tabBarLabel: 'USER'
  };

  constructor(props){
    super(props)
    this.state = {
      data:[],
      isRefreshing: true
    }
    this.isLoading = false
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

  componentWillReceiveProps(nextProps) {
    const {state} = this.props.navigation
    const {isRefreshing, reFreshCb} = nextProps.screenProps
    // console.log(nextProps.screenProps, state.routeName);
    if(state.routeName === 'USER' && isRefreshing) {
      this.scrollView.scrollTo({x: 0, y: 0, animated: true})
      setTimeout(() => {
        this.setState({
          data: data.reverse(),
        })
        if(typeof reFreshCb === 'function'){
          reFreshCb()
        }
      }, 1000)
    }
  }

  loadMore = () => {
    this.isLoading = true
    setTimeout(() => {
      const newData = this.state.data.concat(data)
      this.setState({
        data: newData,
      })
      this.isLoading = false
    }, 600)
  }

  onRefresh = () => {
    this.setState({
      isRefreshing: true
    })
    setTimeout(() => {
      this.setState({
        data: [...data].reverse(),
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
    // console.log(offsetY + containerHeight, this.contentHeight);
    if(!this.isLoading && this.contentHeight !==0 && offsetY + containerHeight > this.contentHeight  - px2dp(LOADING_OFFSET)) {
      // console.log('yes');
      this.loadMore()
    }
  }

  handleContentSizeChange = (contentWidth, contentHeight) => {
    this.contentHeight = contentHeight
  }

  render() {
    const {isRefreshing, data} = this.state
    return (
      <ScrollView
        ref={(el) => this.scrollView = el}
        showsVerticalScrollIndicator={false}
        onScroll={this.handleOnScroll}
        contentContainerStyle={styles.container}
        style={{backgroundColor: '#efefef'}}
        overScrollMode='always'
        onContentSizeChange={this.handleContentSizeChange}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={this.onRefresh}
            tintColor="#bbb"
            style={{flex:1, backgroundColor:'#efefef'}}
            colors={['#ddd', '#0398ff']}
            progressBackgroundColor="#fff"
          />}>
        {
          data.map((item, index) => (
            <UserItem key={index} item={item} onPress={this.goDetail(item)}/>
          ))
        }
        {!isRefreshing && <ActivityIndicator animating={true} />}
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

export default User;
