import List from "../components/list";

export default function CompletedTodos({
  title,
  completedTodos,
  setCompletedTodos,
  setTodos,
  deleteCompleted,
  editTodo,
  setEditTodo,
}) {
  //Revert, remove from "Completed" and add back to "Todos"
  function revertTodo(index) {
    //Add to Todo
    let temp = [...completedTodos];
    setTodos((completed) => [...completed, temp[index]]);

    //Remove from Completed
    let tempTodos = completedTodos;
    tempTodos.splice(index, 1);
    setCompletedTodos(tempTodos);
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <List
          funct={revertTodo}
          todos={completedTodos}
          deleteTodo={deleteCompleted}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          setTodos={setCompletedTodos}
        />
      </div>
    </div>
  );
}
