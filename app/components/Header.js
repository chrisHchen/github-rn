import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
      isSearching: false
    }
  }

  showSetting = () => {
    this.props.navigation.navigate('DrawerToggle');
  }

  toggleSearch = () => {
    this.setState({
      isSearching: !this.state.isSearching
    })
  }

  _renderSearch = () => {
    return this.state.isSearching ? (
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
    return this.state.isSearching ? (
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
        <Icon name="refresh" size={28} color="#fff"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    height: 52,
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
