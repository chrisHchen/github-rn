import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonDetailFrame from '../components/CommonDetailFrame'
import InfoBox from '../components/InfoBox'
import ImageRender from '../components/ImageRender'
import { px2dp, deviceW, deviceH } from '../utils/index'

const noop = () => {}

const data = {
  main:[{
    title: 'Owner',
    value: 'ReactiveX'
  },{
    title: 'Last Updated',
    value: '2017/10/08'
  },{
    title: 'Language',
    value: 'Java'
  },{
    title: 'Authority',
    value: 'Public'
  },{
    title: 'Capacity',
    value: '43.0MB'
  }],
  event:[{
    title: 'Events',
    value: '',
    onPress: noop
  },{
    title: 'Issues',
    value: '(40)'
  },{
    title: 'Stargazers',
    value: '(27739)'
  },{
    title: 'Contributors',
    value: '(10)'
  },{
    title: 'Forks',
    value: '(4882)'
  }],
  code:[{
    title: 'Code',
    value: ''
  }]
}

class RepoDetail extends Component{
  static navigationOptions = {
    title: 'RepoDetail'
  }

  constructor(props){
    super(props)
  }

  _renderHeaderDesc = () => {
    const {state} = this.props.navigation
    const {repo} = state.params
    return (
      <View style={{flexDirection: 'row', width: deviceW, justifyContent: 'space-between', alignItems: 'center'}}>
        <View>
          <Text numberOfLines={5} style={styles.descContent}>
            {repo.desc}
          </Text>
          <Text style={{color: '#efefef'}}>{repo.created}</Text>
        </View>
        <ImageRender
          source={{uri: `${repo.avatar}?v=6&s=120`}}
          width={deviceW/3 - 46}/>
      </View>
    )
  }

  render() {
    const {state} = this.props.navigation
    const {repo} = state.params
    return (
      <CommonDetailFrame
        navigation={this.props.navigation}
        headerDesc={this._renderHeaderDesc()}
        headerDescStyle={styles.headerDesc}
        boldName={repo.name}>
        <View>
          <InfoBox data={data.main} type='strip'/>
          <InfoBox data={data.event} />
          <InfoBox data={data.code} />
        </View>
      </CommonDetailFrame>
    );
  }
}

const styles = StyleSheet.create({
  descContent: {
    color: '#efefef',
    fontSize: 13,
    width: deviceW/3*2,
    marginRight:10,
    marginBottom: 10,
  },
  headerDesc: {
    flexDirection: 'column',
    width: deviceW,
    paddingHorizontal: 15,
    position:'absolute',
  },
})

export default RepoDetail;
