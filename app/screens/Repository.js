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

  static navigationOptions = {
    tabBarLabel: 'REPOSITORY'
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

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        overScrollMode='always'
        onMomentumScrollBegin={this.loadMore}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#bbb"
            style={{flex:1}}
            colors={['#ddd', '#0398ff']}
            progressBackgroundColor="#ffffff"
          />}>
        {
          this.state.data.map((item, index) => (
            <RepoItem key={index}/>
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
    justifyContent: 'center',
  }
})

export default Repository;
