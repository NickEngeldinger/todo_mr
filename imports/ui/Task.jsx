import React, { Component, PropTypes } from 'react';

//Task component - represents a single item
export default class Task extends Component {
	render() {
		return (
			<li>{ this.props.task.text }</li>
		);
	}
}

Task.PropTypes = {
	task: PropTypes.object.isRequired,
};