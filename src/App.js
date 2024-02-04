import "papercss";
import './overwrite-paper.css'
import { useEffect, useState } from "react";
import Todos from "./pages/todos";
import InProgress from "./pages/inProgress";
import CompletedTodos from "./pages/completed";
import FormattedTodos from "./pages/formatted";
import TrashcanModal from "./components/trashcanModal";
import LastTodoModal from "./components/lastTodoModal";
let firstLoad = true;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [hist, setHist] = useState([]);
  const [dark, setDark] = useState(false);
  const [date, setDate] = useState(getDate());
  const [editTodo, setEditTodo] = useState(null);
  const [editInProgress, setEditInProgress] = useState(null);
  const [editCompleted, setEditCompleted] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().getDate());
  const [lastCompleted, setLastCompleted] = useState([]);

  window.onkeydown = (e) => {
    if (e.key === "Escape") {
      document.getElementById("openTrashcanModal").click();
    } else if (e.key === "Tab") {
      document.getElementById("openLastTodoModal").click();
    }
  };

  //Run Once at startup
  useEffect(() => {
    if (!localStorage.gushipro) {
      localStorage.gushipro = JSON.stringify({
        todos,
        inProgress,
        done: completedTodos,
        dark,
        history: hist,
        lastUpdated: new Date().getDate(),
        lastCompleted,
      });
    } else {
      //Get Localstorage
      let settings = JSON.parse(localStorage.gushipro);
      let newDate = new Date().getDate();

      //Set State
      setLastUpdated(newDate);

      //Load data from local storage to state
      //DarkMode
      setDark(settings.dark);
      //Todos
      setTodos(settings.todos);
      //In Progress
      setInProgress(settings.inProgress);
      //Completed
      setCompletedTodos(settings.done);
      //History
      setHist(settings.history);
      //Last Completed
      setLastCompleted(settings.lastCompleted);

      //Check whether it is the next day, if it is we add COMPLETED to our HISTORY
      if (newDate !== settings.lastUpdated && settings.done.length > 0) {
        setCompletedTodos((completedTodos) => {
          //Set new date
          setHist((hist) => [...hist, ...completedTodos]);

          //Replace Yesterday's todo with Completed
          setLastCompleted(completedTodos);

          //Clear Completed
          return [];
        });
      } else {
      }
    }
  }, []);

  //Run this function every 10 mins to update state
  useEffect(() => {
    const timer = setInterval(() => {
      let newDate = new Date().getDate();
      console.log("checking date");

      //WORKAROUND - Wrap code inside a setter in order to access latest completedTodos
      setCompletedTodos((latest) => {
        console.log(latest.length, latest);
        //Check whether it is the next day,
        //AND if length completed array is >0
        //is they are then we add COMPLETED to our HISTORY
        if (newDate !== lastUpdated && latest.length > 0) {
          console.log("changing date!!!");

          //Set new date
          setLastUpdated(newDate);
          setDate(getDate());
        }
        return latest;
      });
    }, 600000);

    return function () {
      console.log("CLEANING UP");
      clearInterval(timer);
    };
  }, []);

  //Refresh when day changes
  useEffect(() => {
    if (!firstLoad) {
      console.log("Clearing Completed");

      //Add Completed to History
      setHist([...hist, ...completedTodos]);

      //Replace Yesterday's todo with Completed
      setLastCompleted(completedTodos);

      //Clear Completed
      setCompletedTodos([]);
    }
  }, [lastUpdated]);

  //Update localstorage when state changes
  useEffect(() => {
    if (!firstLoad) {
      let ls = {};

      //Dark Mode
      dark
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
      ls.dark = dark;

      //Todos
      ls.todos = todos;

      //inProgress
      ls.inProgress = inProgress;

      //Completed
      ls.done = completedTodos;

      //History, aka trash can
      ls.history = hist;

      //Last updated - to check whether or not to refresh
      ls.lastUpdated = lastUpdated;

      //Last completed Todo
      ls.lastCompleted = lastCompleted;

      localStorage.gushipro = JSON.stringify(ls);
    } else {
      firstLoad = false;
    }
  }, [todos, completedTodos, hist, dark, lastUpdated, inProgress]);

  function getDate() {
    return new Date().toLocaleDateString("en-gb", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  //This function does not entirely delete the value, rather it sends it to the history array
  function deleteTodo(index) {
    let tempTodo = todos[index];
    setHist([tempTodo, ...hist]);

    todos.splice(index, 1);
    setTodos([...todos]);
  }

  function deleteInProgress(index) {
    let tempTodo = inProgress[index];
    setHist([...hist, tempTodo]);

    inProgress.splice(index, 1);
    setInProgress([...inProgress]);
  }

  function deleteCompleted(index) {
    let tempTodo = completedTodos[index];
    setHist([...hist, tempTodo]);

    completedTodos.splice(index, 1);
    setCompletedTodos([...completedTodos]);
  }

  function restoreTodo(index) {
    let tempTodo = hist[index];
    setTodos([...todos, tempTodo]);

    hist.splice(index, 1);
    setHist(hist);
  }

  return (
    <div className="paper" style={{ margin: 0, minHeight: "100vh" }}>
      <div className="row" style={{ margin: 0 }}>
        <div
          className="col-12 col"
          style={{
            margin: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h5 style={{ margin: 0 }}>
            DISCLAIMER: Upgraded PRO version, but todos might still magically
            disappear!
          </h5>

          {/* DARK MODE SWITCH */}
          <fieldset className="form-group">
            <label className="paper-switch-2">
              <input
                id="paperSwitch8"
                name="paperSwitch8"
                type="checkbox"
                checked={dark}
                onChange={(e) => setDark(e.target.checked)}
              />
              <span className="paper-switch-slider"></span>
            </label>
            <label htmlFor="paperSwitch8" className="paper-switch-2-label">
              Dark Mode {dark ? "ON" : "OFF"}
            </label>
          </fieldset>
        </div>
      </div>
      <div
        id="todosRow"
        className="row"
        style={{
          height: `calc(100vh - ${
            document.getElementById("todosRow")?.offsetTop
          }px - 50px)`,
        }}
      >
        <div className="sm-6 md-3 col card-container">
          <Todos
            title="Todo"
            todos={todos}
            setTodos={setTodos}
            setInProgress={setInProgress}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
          />
        </div>
        <div className="sm-6 md-3 col card-container">
          <InProgress
            title="In Progress"
            inProgress={inProgress}
            setInProgress={setInProgress}
            setCompletedTodos={setCompletedTodos}
            deleteInProgress={deleteInProgress}
            editTodo={editInProgress}
            setEditTodo={setEditInProgress}
          />
        </div>
        <div className="sm-6 md-3 col card-container">
          <CompletedTodos
            title="Completed"
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
            setTodos={setTodos}
            deleteCompleted={deleteCompleted}
            editTodo={editCompleted}
            setEditTodo={setEditCompleted}
          />
        </div>
        <div className="sm-6 md-3 col">
          <FormattedTodos
            title={`Formatted ${process.env.REACT_APP_APPNAME}`}
            todos={todos}
            inProgress={inProgress}
            completedTodos={completedTodos}
            date={date}
          />
        </div>
      </div>

      {/* Trashcan Modal */}
      <TrashcanModal hist={hist} setHist={setHist} restoreTodo={restoreTodo} />

      {/* Last Todo Modal */}
      <LastTodoModal lastCompleted={lastCompleted} />
    </div>
  );
}
