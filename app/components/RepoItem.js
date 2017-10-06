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

class RepoItem extends Component{
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

  render() {
    return (
      <ItemWrapper>
        <ImageRender source={{uri: 'https://avatars2.githubusercontent.com/u/13569505?v=4&s=40'}}/>
        <View style={styles.contentBox}>
          <View style={styles.header}>
            <Text>RxJava</Text>
            <Text>Java</Text>
          </View>
          <View style={styles.desc}>
            <Text numberOfLines={3} style={styles.descContent}>
              Used to truncate the text with an ellipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={{fontSize: 12}}>star:</Text>
            <Text style={{fontSize: 12, marginRight: 5}}>100</Text>
            <Text style={{fontSize: 12}}>fork:</Text>
            <Text style={{fontSize: 12, marginRight: 5}}>1211</Text>
            <Text style={{fontSize: 12}}>watcher:</Text>
            <Text style={{fontSize: 12}}>32</Text>
          </View>
          <View>
            <Text style={{fontSize: 12}}>
              Updated at : 2017/01/02
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
  },
  descContent: {
    color: '#ccc',
    fontSize: 12,
    // width: deviceW - containerPadding*2 - 15*2 - imageWidth - 10
  },
  desc: {
    marginBottom: 8,
  },
  stat: {
    flexDirection: 'row',
    marginBottom: 8,
  }
})

export default RepoItem;
