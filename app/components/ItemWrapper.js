import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { deviceW } from '../utils/index'

const containerPadding = 15

class ItemWrapper extends Component{

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
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
})

export default ItemWrapper;
