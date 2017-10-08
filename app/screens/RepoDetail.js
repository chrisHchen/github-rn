import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class RepoDetail extends Component{
  static navigationOptions = {
    title: 'RepoDetail'
  }


  render() {
    return (
      <View>
        <Text>RepoDetail</Text>
        <Icon name="reorder" size={28} color="#000" onPress={() => this.props.navigation.goBack()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

})

export default RepoDetail;
