import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { px2dp } from '../utils/index'

export const CommonHeaderHeight = 46

class CommonHeader extends Component{

  render() {
    const {
      style,
      left,
      right,
      children,
      ...others,
    } = this.props

    return (
      <View style={[styles.header, this.props.style]} {...others}>
        <View>
          {this.props.left}
        </View>
        <View style={styles.center}>
          {this.props.children}
        </View>
        <View>
          {this.props.right}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    height: px2dp(CommonHeaderHeight),
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00ccff',
    alignItems: 'center',
    paddingHorizontal:15,
  },
  center:{
    flexDirection:'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight:25,
    flex:1,
  },
})

export default CommonHeader;
