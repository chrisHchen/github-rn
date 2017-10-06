'use strict';

import {Dimensions} from 'react-native'
const basePx = 375


export const deviceH = Dimensions.get('window').height
export const deviceW = Dimensions.get('window').width

export const px2dp = function(px) {
    return px *  deviceW / basePx
}
