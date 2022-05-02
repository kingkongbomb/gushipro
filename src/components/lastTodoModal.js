export default function lastTodoModal({ lastCompleted }) {
  return (
    <>
      <div
        id="showModal"
        className="row flex-spaces child-borders"
        style={{ display: "none" }}
      >
        <label
          id="openLastTodoModal"
          className="paper-btn margin"
          htmlFor="modal-2"
          style={{ margin: 0 }}
        >
          Open Modal
        </label>
      </div>
      <input className="modal-state" id="modal-2" type="checkbox" />
      <div className="modal">
        <label className="modal-bg" htmlFor="modal-2"></label>
        <div
          className="modal-body"
          style={{ maxHeight: "85vh", overflow: "auto" }}
        >
          <label className="btn-close" htmlFor="modal-2">
            X
          </label>
          <div className="modalHeader">
            <h4 className="modal-title" style={{ display: "inline-block" }}>
              Last Completed
            </h4>
          </div>
          <ol>
            {lastCompleted?.map((item, index) => (
              <li key={index}>
                <span className="list-item">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
