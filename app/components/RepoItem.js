import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Animated,
} from 'react-native';
import ItemWrapper from './ItemWrapper'
import ImageRender from './ImageRender'
import { px2dp } from '../utils/index'

class RepoItem extends Component{
  constructor(props){
    super(props)
  }

  goDetail = () => {
    const {onPress} = this.props
    if(typeof onPress === 'function'){
      onPress()
    }
  }

  render() {
    const {item} = this.props
    return (
      <ItemWrapper onPress={this.goDetail}>
        <ImageRender source={{uri: `${item.avatar}?v=6&s=120`}} width={60}/>
        <View style={styles.contentBox}>
          <View style={styles.header}>
            <Text>{item.name}</Text>
            <Text>{item.language}</Text>
          </View>
          <View style={styles.desc}>
            <Text numberOfLines={3} style={styles.descContent}>
              {item.desc}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={{fontSize: 12}}>star:</Text>
            <Text style={{fontSize: 12, marginRight: 5}}>{item.star}</Text>
            <Text style={{fontSize: 12}}>fork:</Text>
            <Text style={{fontSize: 12, marginRight: 5}}>{item.fork}</Text>
            <Text style={{fontSize: 12}}>watcher:</Text>
            <Text style={{fontSize: 12}}>{item.watcher}</Text>
          </View>
          <View>
            <Text style={{fontSize: 12}}>
              {item.updated}
            </Text>
          </View>
        </View>
      </ItemWrapper>
    );
  }
}

const styles = StyleSheet.create({
  contentBox: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  descContent: {
    color: '#ccc',
    fontSize: 12,
    // width: deviceW - containerPadding*2 - 15*2 - imageWidth - 10
  },
  desc: {
    marginBottom: 8,
  },
  stat: {
    flexDirection: 'row',
    marginBottom: 8,
  }
})

export default RepoItem;
