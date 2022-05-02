import List from "../components/list";
export default function InProgress({
  title,
  inProgress,
  setInProgress,
  setCompletedTodos,
  deleteInProgress,
  editTodo,
  setEditTodo,
}) {
  //Todos in progress done, move to "completed"
  function todoDone(index) {
    //Add to Completed
    let temp = [...inProgress];
    setCompletedTodos((completed) => [...completed, temp[index]]);

    //Remove from In Progress
    let tempTodos = inProgress;
    tempTodos.splice(index, 1);
    setInProgress(tempTodos);
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <List
          funct={todoDone}
          todos={inProgress}
          deleteTodo={deleteInProgress}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          setTodos={setInProgress}
        />
      </div>
    </div>
  );
}
