import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from './Button'
import { px2dp } from '../utils/index'

class InfoBox extends Component{

  render() {
    return (
      <View style={styles.dataBox}>
        {
          this.props.data.map((d, index) => (
            <Button key={index} onPress={d.onPress}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.dataItem}>
                  <Text style={{marginRight: 10}}>{d.title}</Text>
                  <Text>{d.value}</Text>
                </View>
                {
                  this.props.type === 'strip' ?
                  <View style={styles.strip}/> :
                  <Icon style={styles.arrow} name="keyboard-arrow-right" size={16} color="#000"/>
                }
              </View>
            </Button>
          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dataBox: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dataItem: {
    marginLeft: px2dp(20),
    flexDirection: 'row',
    height: px2dp(40),
    justifyContent:'flex-start',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    position: 'relative',
    overflow: 'visible',
    flex: 1,
  },
  strip: {
    position: 'absolute',
    width: 2,
    backgroundColor: '#ffcc33',
    height: px2dp(26),
    left: 0,
  },
  arrow: {
    position: 'absolute',
    left: 0
  }
})

export default InfoBox
