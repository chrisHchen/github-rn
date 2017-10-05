import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class Repository extends Component{
  static navigationOptions = {
    tabBarLabel: 'REPOSITORY'
  }

  render() {
    return (
      <View>
        <Text>Repository</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

})

export default Repository;
