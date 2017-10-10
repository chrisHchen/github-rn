import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Animated,
} from 'react-native';
import ItemWrapper from './ItemWrapper'
import ImageRender from './ImageRender'
import { px2dp } from '../utils/index'

class EventItem extends Component{
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
        <ImageRender source={{uri: 'https://avatars2.githubusercontent.com/u/13569505?v=6&s=120'}} width={60}/>
        <View style={styles.contentBox}>
          <View style={styles.header}>
            <Text numberOfLines={2}>
              Where are we at with this decision? In my opinion it is embedded in the nature of
            </Text>
          </View>
          <View style={styles.desc}>
            <Text numberOfLines={2} style={styles.descContent}>
              Used to truncate the text with an ellipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 12}}>
              9 hours ago
            </Text>
          </View>
        </View>
      </ItemWrapper>
    );
  }
}

const styles = StyleSheet.create({
  contentBox: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  descContent: {
    color: '#ccc',
    fontSize: 12,
    // width: deviceW - containerPadding*2 - 15*2 - imageWidth - 10
  },
  desc: {
    marginBottom: 8,
  }
})

export default EventItem;
