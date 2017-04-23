import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import Task from './Task.jsx';

//App component - represents entire app
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hideCompleted: false
		};
	}

	handleSubmit(event) {
		event.preventDefault;

		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		Tasks.insert({
			text,
			createdAt: new Date(),
		});

		ReactDom.findDOMNode(this.refs.textInput).value = '';
	}

	toggleHideCompleted() {
		this.setState({
			hideCompleted: !this.state.hideCompleted
		});
	}

	renderTasks() {
		let filteredTasks = this.props.tasks;
		if (this.state.hideCompleted) {
			filteredTasks = filteredTasks.filter(task => !task.checked);
		}
		return filteredTasks.map((task) => (
			<Task key={task.id} task={task} />
		));
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>To Do List</h1>
				</header>

				<label className="hide-completed">
					<input
						type="checkbox"
						readOnly
						onChecked={this.state.hideCompleted}
						onClick={this.toggleHideCompleted.bind(this)}
					/>
					Hide Completed Tasks
				</label>

				<form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
					<input
						type="text"
						ref="textInput"
						placeholder="Enter new task"
					/>
				</form>

				<ul>
					{ this.renderTasks() }
				</ul>
			</div>
		);
	}
}

App.propTypes = {
	tasks: PropTypes.array.isRequired
};

export default createContainer(() => {
	return {
		tasks: Tasks.find({}, {sort: { createdAt: -1 }}).fetch()
	};
}, App);