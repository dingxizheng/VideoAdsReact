/* 
* @Author: dingxizheng
* @Date:   2016-01-31 17:23:24
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-16 20:41:29
*/

'use strict';

var React   = require('react-native');
var Actions = require('react-native-router-flux').Actions;
var Icon    = require('react-native-vector-icons/MaterialIcons');
var theme   = require('../theme');
var KeyboardSpacer = require('react-native-keyboard-spacer');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	TextInput, 
	Modal
} = React;

var MakePromotion = React.createClass({

	getInitialState: function() {
		return {
			animated: true,
			transparent: true,
			visible: true
		};
	},

	componentDidMount: function() {
	},

	componentWillUnmount: function() {

	},

	onChangeText: function(text) {
		this.inputText = text;
	},

	onDone: function() {
		var ondone = this.props.onDone || function() {};
		if (this.inputText && this.inputText.length > 0) {
			ondone(this.inputText) && this._onClose();
		}
	},

	_onClose: function() {
		Actions.dismiss();
	},

	render: function() {

		return (
			<Modal animated={this.state.animated}
          		   transparent={this.state.transparent}
          		   visible={this.state.visible}>
			<View style={[styles.container]}>
				<View style={[styles.contentWrapper]}>
					<View style={styles.header}>
						
						<TouchableOpacity style={styles.headerClose} onPress={this._onClose}>
							<Icon name="close" style={styles.footerMenuItemIcon}/>
						</TouchableOpacity>

						<View style={styles.headerTitle}>
							<Text style={styles.headerTitleText}>{ this.props.title || ""}</Text>
						</View>
						
					</View>
					
					<View style={styles.content}>
						<TextInput onChangeText={this.onChangeText} style={styles.contentInput} multiline={true} autoFocus={true} placeholder={	this.props.placeholder || "put your comment here..." }/>
					</View>
					
					<View style={styles.footer}>
						<TouchableOpacity style={styles.footerMenuItemWrapper} onPress={this.onDone}>
							<Text style={styles.footerMenuItemText}>{this.props.buttonName || 'Send'}</Text>
						</TouchableOpacity>
					</View>
				</View>
				<KeyboardSpacer/>
			</View>
			</Modal>
		);
	}
});


var styles = StyleSheet.create({
	container: {
        position: 'absolute',
        // top:0,
        bottom:0,
        left:0,
        right:0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWrapper: {
    	borderWidth: 0.5,
		borderColor: '#bbbbbb',
		flexDirection: 'column',
		alignSelf: 'stretch',
		backgroundColor: 'white',
		shadowOffset:{
            width: 1,
            height: 2,
        },
        shadowColor: 'black',
        shadowOpacity: 0.5,
    },
    header: {
		height: 45,
		flexDirection: 'row',
		backgroundColor: '#eeeeee',
		borderBottomColor: '#eeeeee',
		borderBottomWidth: .5
    },
    headerTitle: {
    	flex: .9,
    	justifyContent: 'center',
        paddingLeft: 10,
    },
    headerTitleText: {
    	color: theme.colors.GREY_FONT,
    },
    headerClose: {
    	flex: 0.1,
    	justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
    	flexDirection: 'column',
    	padding: 10,
    },
    contentInput: {
    	height: 100,
    	fontSize: 17,
    	color: theme.colors.GREY_FONT,
    },
    footer: {
		height: 45,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		backgroundColor: '#eeeeee',
		borderTopColor: '#eeeeee',
		borderTopWidth: .5
	},
	footerMenuItemWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},
	footerMenuItemIcon: {
		color: theme.colors.GREY_FONT,
	    fontSize: 22,
	    padding: 3
	},
	footerMenuItemText: {
		color: theme.colors.GREY_FONT,
	    fontSize: 13,
	    padding: 3,
	    paddingRight: 10,
	},
});

module.exports = MakePromotion;