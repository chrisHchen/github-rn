import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemWrapper from './ItemWrapper'
import ImageRender from './ImageRender'

class UserItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      isLoaded: false,
      fadeAnim: new Animated.Value(0),
    }
  }

  loaded = () => {
    this.setState({
      isLoaded: true
    })

    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1500,
      }
    ).start()
  }

  goDetail = () => {
    const {onPress} = this.props
    if(typeof onPress === 'function'){
      onPress()
    }
  }

  render() {
    return (
      <ItemWrapper onPress={this.goDetail}>
        <ImageRender source={{uri: 'https://avatars2.githubusercontent.com/u/13569505?v=4&s=80'}}/>
        <View style={styles.contentBox}>
          <Text>ChrisHchen</Text>
        </View>
      </ItemWrapper>
    );
  }
}

const styles = StyleSheet.create({
  contentBox: {
    flex: 1,
  },
})

export default UserItem;
