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
              <View style={styles.rowCenter}>
                <View style={[styles.rowCenter,{flex: 1}]}>
                  <View style={{width: px2dp(20)}}>
                    {
                      this.props.type === 'strip' ?
                      <View style={styles.strip}/> :
                      <Icon style={styles.arrow} name="keyboard-arrow-right" size={16} color="#000"/>
                    }
                  </View>
                  <View style={styles.dataItem}>
                    <Text style={{marginRight: 10}}>{d.title}</Text>
                    <Text>{d.value}</Text>
                  </View>

                </View>
                {
                  d.rightIcon &&
                  <View style={{width: px2dp(40)}}>
                    {d.rightIcon}
                  </View>
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
    width: '100%'
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dataItem: {
    flexDirection: 'row',
    height: px2dp(50),
    justifyContent:'flex-start',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flex: 1
  },
  strip: {
    width: 2,
    backgroundColor: '#ffcc33',
    height: px2dp(26),
  },
  arrow: {
    width: px2dp(20)
  }
})

export default InfoBox
