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
const LOADING_OFFSET = 50

class User extends Component{
  static navigationOptions = {
    tabBarLabel: 'USER'
  };

  constructor(props){
    super(props)
    this.state = {
      data:[],
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
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      const newData = this.state.data.concat(data)
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
    navigate('UserDetail', {repo: item})
  }

  handleOnScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y
    const { isLoading } = this.state
    // console.log(offsetY + containerHeight, this.contentHeight);
    if(!isLoading && this.contentHeight !==0 && offsetY + containerHeight > this.contentHeight  - px2dp(LOADING_OFFSET)) {
      // console.log('yes');
      this.loadMore()
    }
  }

  handleContentSizeChange = (contentWidth, contentHeight) => {
    this.contentHeight = contentHeight
    this.setState({
      isLoading: false
    })
  }

  render() {
    const {isLoading, isRefreshing, data} = this.state
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
            onRefresh={this._onRefresh}
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
        {<ActivityIndicator style={{paddingBottom: 20}} animating={isLoading} />}
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
