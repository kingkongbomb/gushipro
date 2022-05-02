import { useState } from "react";
import List from "../components/list";
export default function Todo(props) {
  const [newTodo, setNewTodo] = useState("");

  function addTodo(e) {
    if (e.key === "Enter") {
      let targetTodo = newTodo.trim();

      //Don't add if its an empty todo
      if (targetTodo !== "") {
        //add our new todo
        props.setTodos([...props.todos, targetTodo]);

        //Clear new todo
        setNewTodo("");
      }
    }
  }

  //Start on Todo , remove from "TODO" and add in to "In Progress"
  function startTodo(index) {
    //Add to Completed
    let temp = [...props.todos];
    props.setInProgress((completed) => [...completed, temp[index]]);

    //Remove from props.todos
    let tempTodos = props.todos;
    tempTodos.splice(index, 1);
    props.setTodos(tempTodos);
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-props.title">{props.title}</h4>

        <div className="form-group">
          <textarea
            className="input-block"
            style={{ height: "46px" }}
            value={newTodo}
            type="text"
            placeholder="Add Todo here!"
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={addTodo}
          />
        </div>
        <List funct={startTodo} {...props} />
      </div>
    </div>
  );
}
