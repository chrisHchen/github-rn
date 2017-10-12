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
import RepoItem from '../components/RepoItem';
import { deviceH, px2dp } from '../utils/index'
import { HEADER_HEIGHT } from '../components/Header'
import {data} from '../data'

const containerHeight = deviceH - px2dp(HEADER_HEIGHT) - 20
const LOADING_OFFSET = 30

class Repository extends Component{
  static navigationOptions = {
    tabBarLabel: 'REPOSITORY',
    // tabBarOnPress:(screen) => {
    //   console.log(screen)
    // }
  }

  constructor(props){
    super(props)
    this.state = {
      data: [],
      isLoading: false,
      isRefreshing: false,
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

  componentWillReceiveProps(nextProps) {
    const {state} = this.props.navigation
    const {isRefreshing, reFreshCb} = nextProps.screenProps
    // console.log(nextProps.screenProps, state.routeName);
    if(state.routeName === 'REPOSITORY' && isRefreshing) {
      this.scrollView.scrollTo({x: 0, y: 0, animated: true})
      setTimeout(() => {
        this.setState({
          data: [...data].reverse(),
        })
        if(typeof reFreshCb === 'function'){
          reFreshCb()
        }
      }, 1000)
    }
  }

  loadMore = () => {

    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      const newData = this.state.data.concat(data)
      // console.log(newData)
      this.setState({
        data: newData,
      })
    }, 600)
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
    navigate('RepoDetail', {repo: item})
  }

  handleOnScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y
    const {isLoading} = this.state
    // console.log(offsetY + containerHeight, this.contentHeight);
    if(!isLoading && this.contentHeight !==0 && offsetY + containerHeight > this.contentHeight - px2dp(LOADING_OFFSET)) {
      this.loadMore()
    }
  }

  handleContentSizeChange = (contentWidth, contentHeight) => {
    this.contentHeight = contentHeight
    // do state change here to ensure that load is not called multiple times
    this.setState({
      isLoading: false
    })
  }

  render() {
    const {isLoading, isRefreshing, data} = this.state
    // In android ActivityIndicator dont work well(dont know why), use opacity to work around
    return (
      <ScrollView
        ref={(el) => this.scrollView = el}
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
            <RepoItem item={item} key={index} onPress={this.goDetail(item)}/>
          ))
        }
        <ActivityIndicator style={{paddingBottom: 20}} animating={isLoading} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    position: 'relative',
    alignItems: 'center',
    minHeight: containerHeight,
    backgroundColor: '#efefef',
    justifyContent: 'flex-start',
  }
})

export default Repository;
