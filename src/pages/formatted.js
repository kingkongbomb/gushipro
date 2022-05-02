import { useEffect, useState } from "react";

export default function FormattedTodos({
  title,
  todos,
  inProgress,
  completedTodos,
  date,
}) {
  const [formatted, setFormatted] = useState("");
  useEffect(() => {
    setFormatted(
      `${date}

Completed
${formatTodos(completedTodos)}

In Progress
${formatTodos(inProgress)}

ToDo
${formatTodos(todos)} 
`
    );
  }, [todos, completedTodos, date, inProgress]);

  function formatTodos(todos) {
    return (
      `${todos.map((todo, index) => `${index + 1}. ${todo}`).join("\n")}` || "-"
    );
  }

  function copyText() {
    document.getElementById("myTextArea").select();
    document.execCommand("copy");
    showPopup(3000);
  }

  function showPopup(timeout) {
    document.getElementById("copy").setAttribute("popover-top", "Text copied!");
    setTimeout(
      () => document.getElementById("copy").removeAttribute("popover-top"),
      timeout
    );
  }
  return (
    <div className="card">
      <div className="card-body" style={{display:'flex', flexDirection:'column'}}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h4 className="card-title">{title}</h4>
          <button
            id="copy"
            style={{ margin: 0 }}
            className="btn-small btn-secondary"
            onClick={copyText}
          >
            Copy
          </button>
        </div>

        <div className="card-text" style={{flexGrow:1}}>
          <textarea
            id="myTextArea"
            onChange={(e) => setFormatted(e.target.value)}
            value={formatted}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
