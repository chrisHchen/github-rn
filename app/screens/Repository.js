import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import RepoItem from '../components/RepoItem';
import { deviceH } from '../utils/index'

class Repository extends Component{
  static navigationOptions = {
    tabBarLabel: 'REPOSITORY'
  }

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

  goDetail = () => {
    const {navigate} = this.props.navigation
    navigate('RepoDetail', {name: 'x'})
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        style={{backgroundColor: '#efefef'}}
        overScrollMode='always'
        onMomentumScrollBegin={this.loadMore}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#bbb"
            style={{flex:1, backgroundColor:'#efefef'}}
            colors={['#ddd', '#0398ff']}
            progressBackgroundColor="#fff"
          />}>
        {
          this.state.data.map((item, index) => (
            <RepoItem key={index} onPress={this.goDetail}/>
          ))
        }
        {<ActivityIndicator style={{paddingBottom: 20}} animating={this.state.isLoading}/>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    minHeight: deviceH,
    backgroundColor: '#efefef',
    justifyContent: 'flex-start',
  }
})

export default Repository;
