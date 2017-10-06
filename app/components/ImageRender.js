import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { px2dp } from '../utils/index'

const imageWidth = 46

class ImageRender extends Component{
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
    const {isLoaded, fadeAnim} = this.state
    return (
      <View style={{marginRight:px2dp(30)}}>
        <Animated.View style={{
          opacity: fadeAnim,
        }}>
          <Image
            source={this.props.source}
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
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: imageWidth/2,
    width: imageWidth,
    height: imageWidth,
  },
})

export default ImageRender;
