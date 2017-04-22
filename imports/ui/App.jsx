import React, { Component } from 'react';
import Task from './Task.jsx';

//App component - represents entire app
export default class App extends Component {
	getTasks() {
		return [
			{ _id: 1, text: 'This is task 1'},
			{ _id: 2, text: 'This is task 2'},
			{ _id: 3, text: 'This is task 3'}
		];
	}

	renderTasks() {
		return this.getTasks().map((task) => (
			<Task key={task.id} task={task} />
		));
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>To Do List</h1>
				</header>
			</div>

			<ul>
				{ this.renderTasks() }
			</ul>
		);
	}
}
