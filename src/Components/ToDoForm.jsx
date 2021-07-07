import React from "react";
import { v4 as uuid } from "uuid";

export default class ToDoForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "",
		};
	}

	formHandler = (e) => {
		this.setState({
			content: e.target.value,
		});
	};

	submitHandler = (e) => {
		e.preventDefault();
		const a = { ...this.state, id: uuid() };
		if (this.state.content) this.props.addToDo({ ...this.state, id: uuid() });
		this.setState({ content: "" });
	};

	render() {
		return (
			<div>
				<form onSubmit={this.submitHandler} className="ToDoForm">
					<input
						className="ToDoForm-input"
						type="text"
						placeholder="Add Todo"
						value={this.state.content}
						onChange={this.formHandler}
					/>
					<button className="Button-add">
						<i className="bx bx-plus"></i>
					</button>
				</form>
			</div>
		);
	}
}
