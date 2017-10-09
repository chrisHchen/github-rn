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

const containerHeight = deviceH - px2dp(HEADER_HEIGHT) - 20

class Repository extends Component{
  static navigationOptions = {
    tabBarLabel: 'REPOSITORY'
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
        data: [0,1,2,3,4,5],
        isRefreshing: false
      })
    }, 1500)
  }

  loadMore = () => {
    // console.log(1);
    this.setState({
      isLoading: true
    })
    // this.isLoading = true
    setTimeout(() => {
      const newData = this.state.data
      newData.push(1,1)
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
        data: [0,1,2,3,4,5],
        isRefreshing: false
      })
    }, 1500)
  }

  goDetail = () => {
    const {navigate} = this.props.navigation
    navigate('RepoDetail', {name: 'x'})
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
            <RepoItem key={index} onPress={this.goDetail}/>
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

export default Repository;
