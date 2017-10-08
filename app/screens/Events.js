import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import CommonHeader from '../components/CommonHeader'
import Icon from 'react-native-vector-icons/MaterialIcons';

class Events extends Component{

  showSetting = () => {
    this.props.navigation.navigate('DrawerToggle');
  }

  render() {
    return (
      <View style={styles.box}>
        <CommonHeader
          left={
          <Icon name="reorder" size={28} color="#fff" onPress={() => this.props.navigation.navigate('DrawerToggle')}/>
          }
          right={
            <Icon name="refresh" size={28} color="#fff"/>
          }/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    marginTop: (Platform.OS === 'ios' ? 20 : 0),
  },
})

export default Events;
