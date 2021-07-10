import React from "react";
import { v4 as uuid } from "uuid";
import ToDoItem from "./ToDoItem";
import TodoForm from "./ToDoForm";

export default class ToDoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: JSON.parse(localStorage.getItem("todos")) || [
				{ content: "Add Todo", id: uuid() },
			],
		};
		// localStorage.setItem("todos", this.state.todos);
	}

	addToDo = (todo) => {
		this.setState(
			(prevState) => {
				return { todos: [...prevState.todos, todo] };
			},
			() => localStorage.setItem("todos", JSON.stringify(this.state.todos))
		);
	};

	deleteToDo = (id) => {
		this.setState(
			(prevState) => {
				return { todos: prevState.todos.filter((e) => e.id !== id) };
			},
			() => localStorage.setItem("todos", JSON.stringify(this.state.todos))
		);
	};

	editToDo = (id, editedItem) => {
		this.setState(
			(prevState) => {
				const newTodo = prevState.todos.map((e) => {
					if (e.id === id) e.content = editedItem;
					return e;
				});

				// console.log(newTodo);
				return { todos: newTodo };
			},
			() => localStorage.setItem("todos", JSON.stringify(this.state.todos))
		);
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
					<h1 className="ToDoList-title">To-Do</h1>
					<div className="ToDoList-todos">{todos}</div>
				</div>
				<TodoForm addToDo={this.addToDo} />
			</div>
		);
	}
}
