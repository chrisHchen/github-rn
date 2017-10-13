import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';
import { deviceW } from '../utils/index'
import Button from './Button'

const containerPadding = 15

class ItemWrapper extends Component{

  constructor(props) {
    super(props)
    this.state = {
      scale: new Animated.Value(.5),
      // scale: new Animated.Value(0.3),
      // opacity:new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.scale,
      {
        toValue: 1,
        useNativeDriver: true
      }
    ).start()
    // Animated.timing(
    //   this.state.scaleY,
    //   {
    //     toValue: 1,
    //     duration: 500
    //   }
    // ).start()

    // Animated.timing(
    //   this.state.opacity,
    //   {
    //     toValue: 1
    //   }
    // ).start()
  }

  render() {
    return (
      <Animated.View style={{
        ...this.props.style,
        // opacity: this.state.opacity,
        justifyContent: 'center',
        transform: [{scale: this.state.scale}]
      }}>
        <Button {...this.props} style={{marginBottom: 15, justifyContent: 'center'}}>
          <View style={styles.container}>
            {this.props.children}
          </View>
        </Button>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    padding: containerPadding,
    width: deviceW - 15*2, // for numberOfLines to work
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 3,
  },
})

export default ItemWrapper;
