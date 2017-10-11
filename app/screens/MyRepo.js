import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import CommonHeader from '../components/CommonHeader'
import RepoItem from '../components/RepoItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonDetailFrame from '../components/CommonDetailFrame'

class MyRepo extends Component{

  constructor(props){
    super(props)
    this.state = {
      data: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: [0,1,2,3,4,5],
      })
    }, 1000)
  }

  loadMore = (cb) => {
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
      cb && cb()
    }, 1000)
  }

  showSetting = () => {
    this.props.navigation.navigate('DrawerToggle');
  }

  goDetail = () => {
    const {navigate} = this.props.navigation
    navigate('RepoDetail', {name: 'x'})
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
        boldName='Repository'
        ActivityIndicator={
          <ActivityIndicator style={{paddingBottom: 20}} animating={true} style={{opacity: isLoading ? 1: 0}}/>
        }
        onLoadMore={this.loadMore}>
        <View>
          {
            data.length === 0 ? <ActivityIndicator style={{paddingBottom: 20}} animating={true}/> :
            data.map((item, index) => (
              <RepoItem key={index} onPress={this.goDetail}/>
            ))
          }
        </View>
      </CommonDetailFrame>
    );
  }
}

const styles = StyleSheet.create({

})

export default MyRepo;