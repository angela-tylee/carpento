import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

const Message = () => {
  
  const { messageType, message } = useContext(MessageContext)

  return (
    <div className="toast-container position-fixed start-50 translate-middle-x p-3" style={{ top: "5%" }}>
      <div
        id="myToast"
        className={`toast bg-${messageType}-subtle text-${messageType} shadow-sm align-items-center text-bg-primary border-0`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            {messageType === "success" ? (
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
