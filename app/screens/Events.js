import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Events extends Component{

  showSetting = () => {
    this.props.navigation.navigate('DrawerToggle');
  }

  render() {
    return (
      <View>
        <Text>Events</Text>
        <Icon name="reorder" size={28} color="#000" onPress={this.showSetting}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

})

export default Events;
