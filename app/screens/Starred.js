import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import RepoItem from '../components/RepoItem'
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonDetailFrame from '../components/CommonDetailFrame'
import {data} from '../data'

class Starred extends Component{

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
        data: data,
      })
    }, 1000)
  }

  loadMore = (cb) => {
    this.setState({
      isLoading: true
    })
    const newData = this.state.data.concat(data)
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

  goDetail = (item) => () => {
    const {navigate} = this.props.navigation
    navigate('RepoDetail', {repo: item})
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
        boldName='Starred'
        ActivityIndicator={
          isLoading && <ActivityIndicator animating={isLoading}/>
        }
        onLoadMore={this.loadMore}>
        <View>
          {
            data.length === 0 ? <ActivityIndicator style={{paddingBottom: 20}} animating={true}/> :
            data.map((item, index) => (
              <RepoItem item={item} key={index} onPress={this.goDetail(item)}/>
            ))
          }
        </View>
      </CommonDetailFrame>
    );
  }
}

const styles = StyleSheet.create({

})

export default Starred;
