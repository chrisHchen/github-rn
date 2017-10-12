import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { px2dp } from '../utils/index'

export const HEADER_HEIGHT = 52

class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
      isSearchShow: false,
      rotate: new Animated.Value(0)
    }
    this.rotateCounter = 0
  }

  showSetting = () => {
    this.props.navigation.navigate('DrawerToggle');
  }

  toggleSearch = () => {
    this.setState({
      isSearchShow: !this.state.isSearchShow
    })
  }

  handleRefresh = () => {
    const {onRefresh} = this.props
    this.rotateCounter = this.rotateCounter + 1
    Animated.timing(
      this.state.rotate,
      {
        toValue: this.rotateCounter * 360,
        // useNativeDriver: true,
      }
    ).start()
    if(typeof onRefresh === 'function'){
      onRefresh()
    }
  }

  handleSearch = () => {
    const {onSearch} = this.props
    if(typeof onSearch === 'function'){
      onSearch()
    }
  }

  _renderSearch = () => {
    return this.state.isSearchShow ? (
      <View style={styles.searchBox}>
        <TextInput
          ref={(el) => this.searchInput = el}
          style={styles.searchText}
          underlineColorAndroid='transparent'
          autoFocus={true}
          placeholder='search condition'
          placeholderTextColor='rgba(255,255,255,.7)'></TextInput>
      </View>
    ):(
      <View style={styles.searchBox}>
        <Text style={styles.exploreText}>Explore</Text>
        <Icon style={styles.search} name="search" size={28} color="#fff" onPress={this.toggleSearch}/>
      </View>
    )
  }

  _renderLeftIcon = () => {
    return this.state.isSearchShow ? (
      <Icon name="arrow-back" size={28} color="#fff" onPress={this.toggleSearch}/>
    ) : (
      <Icon name="reorder" size={28} color="#fff" onPress={this.showSetting}/>
    )
  }

  render() {
    return (
      <View style={styles.header}>
        {this._renderLeftIcon()}
        {this._renderSearch()}
        <Animated.View style={{
          transform: [{rotateZ: this.state.rotate.interpolate({
                              inputRange: [0, 360],
                              outputRange: ['0deg', '360deg']
        })}]
        }}>
          <Icon name="refresh" size={28} color="#fff" onPress={this.handleRefresh}/>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    height: px2dp(HEADER_HEIGHT),
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00ccff',
    alignItems: 'center',
    marginTop: (Platform.OS === 'ios' ? 20 : 0),
    paddingHorizontal:15,
  },
  searchBox:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
    marginRight:25,
    flex:1,
  },
  exploreText:{
    fontSize: 20,
    color: '#fff',
    fontWeight:'700'
  },
  searchText:{
    flex: 1,
    fontSize: 14,
    color: '#fff',
    paddingHorizontal: 15
  }
})

export default Header;
