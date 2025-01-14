const Message = ({ type, message }) => {
  // FIXME: mobile 沒有顯示通知
  console.log("Message", type, message);
  return (
    <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
      <div
        id="myToast"
        className={`toast bg-${type}-subtle text-${type} shadow-sm align-items-center text-bg-primary border-0`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            {type === "success" ? (
              <i className="bi bi-check-circle-fill text-success me-1"></i>
            ) : (
              <i className="bi bi-x-circle-fill text-danger me-1"></i>
            )}
            {message}
          </div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Message;
