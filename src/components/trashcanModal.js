export default function TrashcanModal({ hist, setHist, restoreTodo }) {
  return (
    <>
      <div
        id="showModal"
        className="row flex-spaces child-borders"
        style={{ display: "none" }}
      >
        <label
          id="openTrashcanModal"
          className="paper-btn margin"
          htmlFor="modal-1"
          style={{ margin: 0 }}
        >
          Open Modal
        </label>
      </div>
      <input className="modal-state" id="modal-1" type="checkbox" />
      <div className="modal">
        <label className="modal-bg" htmlFor="modal-1"></label>
        <div
          className="modal-body"
          style={{ maxHeight: "85vh", overflow: "auto" }}
        >
          <label className="btn-close" htmlFor="modal-1">
            X
          </label>
          <div className="modalHeader">
            <h4 className="modal-title" style={{ display: "inline-block" }}>
              Trash Can
            </h4>
            <button
              className="btn-small btn-danger"
              style={{ margin: "0 40px 0 0" }}
              onClick={() => setHist([])}
              popover-left="SURE AH? DON'T REGRET!!!"
            >
              PERMANENTLY DELETE ALL!!!
            </button>
          </div>
          <ol>
            {hist?.map((item, index) => (
              <li key={index}>
                <div className="todo-row">
                  <span className="list-item">{item}</span>

                  <button
                    onClick={() => restoreTodo(index)}
                    className="btn-small btn-success restore"
                  >
                    Restore
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
