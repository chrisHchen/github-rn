import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { deviceW } from '../utils/index'
import Button from './Button'

const containerPadding = 15

class ItemWrapper extends Component{

  render() {
    return (
      <Button {...this.props} style={{marginBottom: 15}}>
        <View style={styles.container}>
          {this.props.children}
        </View>
      </Button>
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
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 3,
  },
})

export default ItemWrapper;
