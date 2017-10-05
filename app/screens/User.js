import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class User extends Component{
  static navigationOptions = {
    tabBarLabel: 'USER'
  };

  render() {
    return (
      <View>
        <Text>User</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

})

export default User;
