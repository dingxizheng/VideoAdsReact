/* 
* @Author: dingxizheng
* @Date:   2016-01-27 19:50:46
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-09 14:45:42
*/

'use strict';

var React       = require('react-native');
var Icon        = require('react-native-vector-icons/FontAwesome');
var GlobalEvent = require('../GlobalEvent');
var { BackIcon } = require('@exponent/react-native-navigator/ExNavigatorIcons');
import ExNavigatorStyles from '@exponent/react-native-navigator/ExNavigatorStyles';

var {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} = React;

var {
  Actions
} = require('react-native-router-flux');

var ActionButtons = React.createClass({

	getInitialState: function() {
		return {
			buttons: []
		};
	},

	componentWillMount: function() {
		GlobalEvent.trigger('left_buttons_mounted', this.setButtons, function(callback) {
			this.onMounted = callback;
		}.bind(this));
	},

	componentDidMount: function() {
		this.onMounted();
	},

	setButtons: function(buttons) {
		this.setState({
			buttons: buttons
		});
	},

	_originRenderLeftButton: function(navigator, index, state){
		let currentReoute = state.routeStack[index];
	    
	    if (index === 0 || index < navigator.getCurrentRoutes().length-1) {
	        return null;
	    }

	    let title = currentReoute.getBackButtonTitle(navigator, index, state);
	    
	    if (title) {
	        var buttonText =
	            <Text
	                numberOfLines={1}
	                style={[
			            ExNavigatorStyles.barButtonText,
			            ExNavigatorStyles.barBackButtonText,
			            navigator.props.barButtonTextStyle,
			          ]}>
	                {title}
	            </Text>;
	    }

	    return (
	        <TouchableOpacity
	            pressRetentionOffset={ExNavigatorStyles.barButtonPressRetentionOffset}
	            onPress={() => Actions.pop()}
	            style={[ExNavigatorStyles.barBackButton]}>
	            <BackIcon
	                style={[
			            ExNavigatorStyles.barButtonIcon,
			            navigator.props.barButtonIconStyle,
			          ]}
	            />
	            {buttonText}
	        </TouchableOpacity>
	    );
	},

	render: function() {

		if (this.state.buttons.length > 0)
			return (
				<View style={styles.barLeftButton}>
				{this.state.buttons.map(function(b, i) {

					return (
						<TouchableOpacity key={i} onPress={b.onPress || console.log } style={styles.barButtonIconWrapper}>
				        { function(){ 
			              if (b.icon) {
				            return <Icon name={b.icon} style={styles.barButtonIcon} />
				          } else{
				          	return <Text style={styles.barButtonText}>{b.text}</Text>
				          }
			            }.bind(this).call()}
				        </TouchableOpacity>
					);

				}.bind(this))}
				</View>
			);
		else 
			return this._originRenderLeftButton(this.props.navigator, this.props.index,  this.props.state);
	}
});

var styles = StyleSheet.create({
	barLeftButton: {
		paddingLeft: 4,
	    paddingBottom: 6,
	    flexDirection: 'row',
	    justifyContent: 'flex-start',
	    flex: 1
	},
	barButtonIconWrapper: {
		marginTop: 8,
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: 8,
		paddingLeft: 8,
	},
	barButtonIcon: {
	    color: 'white',
	    fontSize: 22
	},
	barButtonText: {
	    color: 'white',
	    fontSize: 17
	}
});

module.exports = ActionButtons;