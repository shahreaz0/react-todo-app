import React from "react";

export default class ToDoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			task: this.props.todo.content,
			isDone: false,
		};
	}

	toggleForm = () => {
		this.setState({
			isEditing: true,
		});
	};

	saveButtonHandler = (e) => {
		e.preventDefault();
		this.props.editToDo(this.props.todo.id, this.state.task);
		this.setState({
			isEditing: !this.state.isEditing,
		});
	};

	formHandler = (e) => {
		this.setState({
			task: e.target.value,
		});
	};

	doneHandler = () => {
		this.setState({
			isDone: !this.state.isDone,
		});
	};

	render() {
		const style = this.state.isDone
			? { textDecoration: "line-through" }
			: { textDecoration: "none" };
		// console.log(style);
		const itemSection = (
			<div className="ToDoItem">
				<span
					className="ToDoItem-content"
					onClick={this.doneHandler}
					style={style}
				>
					{this.props.todo.content}
				</span>
				<div className="Button-group">
					<button className="Button lite-green" onClick={this.toggleForm}>
						<i className="bx bx-edit-alt"></i>
					</button>
					<button
						className="Button lite-pink"
						onClick={() => this.props.deleteToDo(this.props.todo.id)}
					>
						<i className="bx bx-trash"></i>
					</button>
				</div>
			</div>
		);

		const form = (
			<div>
				<form onSubmit={this.saveButtonHandler} className="ToDoForm">
					<input
						className="ToDoItem-save-input"
						type="text"
						value={this.state.task}
						onChange={this.formHandler}
					/>
					<button className="Button-save">
						<i className="bx bx-check"></i>
					</button>
				</form>
			</div>
		);

		return <div>{this.state.isEditing ? form : itemSection}</div>;
	}
}
