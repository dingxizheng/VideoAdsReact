/* 
* @Author: dingxizheng
* @Date:   2016-02-19 20:27:31
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-29 16:03:57
*/

'use strict';

var React   = require('react-native');
var Spinner = require('react-native-spinkit');
var Overlay = require('react-native-overlay');
var theme   = require('../theme');

var {
  StyleSheet,
  View,
  Text,
  Dimensions
} = React;

var {height, width} = Dimensions.get('window');

var Loading = React.createClass({
  
  render: function() {

    return (
      <Overlay isVisible={this.props.isVisible}>
        
        <View style={styles.container} >
         	<View style={styles.header}>
         		<Spinner isVisible={this.props.isVisible} size={25} type={"Wave"} color={"#bbbbbb"}/>
         		{function(){
         			if (this.props.text)
         				return <Text style={styles.text}>{this.props.text}</Text>
         		}.bind(this).call()}
         	</View>
        </View>

      </Overlay>
    );

  }

});


var styles = StyleSheet.create({
	container: {
		paddingTop: 64,
		height: height,
		width: width,
		backgroundColor: '#55555555'
	},
	header: {
      height: 64,
      flexDirection: 'row',
      backgroundColor: '#eeeeee',
      justifyContent: 'center',
      alignItems: 'center',
  },
  text: {
  	color: '#bbbbbb',
    fontSize: 17,
    paddingLeft: 14,
  }
});


module.exports = Loading;
