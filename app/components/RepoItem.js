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
import { deviceW } from '../utils/index'

const containerPadding = 15
const imageWidth = 40

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

  _renderIcon = () => {
    const {isLoaded, fadeAnim} = this.state
    console.log(isLoaded);
    return (
      <View>
        <Animated.View style={{
          opacity: fadeAnim,
        }}>
          <Image
            source={{uri: 'https://avatars2.githubusercontent.com/u/13569505?v=4&s=40'}}
            onLoad={this.loaded}
            style={[styles.image, {
              width: isLoaded ? imageWidth: 1, // for ios
              height: isLoaded ? imageWidth: 1,
            }]} />
        </Animated.View>
        {
          <Animated.View style={{
            opacity: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
          }),
          }}>
            {
              !isLoaded &&
              <Icon style={styles.image} name="logo-github" size={40} color="#000"/>
            }
          </Animated.View>
        }
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderIcon()}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    padding: containerPadding,
    width: deviceW - 15*2, // for numberOfLines to work
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 3,
  },
  image: {
    borderRadius: imageWidth/2,
    width: imageWidth,
    height: imageWidth,
    marginRight:10,
  },
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
