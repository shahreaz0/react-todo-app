import React from "react";
import { v4 as uuid } from "uuid";
import ToDoItem from "./ToDoItem";
import TodoForm from "./ToDoForm";

export default class ToDoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [
				{ content: "Eat", id: uuid() },
				{ content: "Sleep", id: uuid() },
				{ content: "Code", id: uuid() },
			],
		};
		localStorage.setItem("todos", this.state.todos);
	}

	addToDo = (todo) => {
		this.setState((prevState) => {
			return { todos: [...prevState.todos, todo] };
		});
	};

	deleteToDo = (id) => {
		this.setState((prevState) => {
			return { todos: prevState.todos.filter((e) => e.id !== id) };
		});
	};

	editToDo = (id, editedItem) => {
		this.setState((prevState) => {
			const newTodo = prevState.todos.map((e) => {
				if (e.id === id) e.content = editedItem;
				return e;
			});

			console.log(newTodo);
			return { todos: newTodo };
		});
	};

	render() {
		const todos = this.state.todos.map((todo) => (
			<ToDoItem
				key={todo.id}
				todo={todo}
				deleteToDo={this.deleteToDo}
				editToDo={this.editToDo}
			/>
		));
		return (
			<div className="ToDoList">
				<div>
					<h1 className="ToDoList-title">ToDo App</h1>
					<div className="ToDoList-todos">{todos}</div>
				</div>
				<TodoForm addToDo={this.addToDo} />
			</div>
		);
	}
}
