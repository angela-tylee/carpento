const DeleteModal = ({ id, text, handleDelete, closeDeleteModal, isLoadingDelete }) => {
  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="deleteModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h1 className="modal-title text-light fs-5" id="exampleModalLabel">
              Are you sure to delete?
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeDeleteModal}
            />
          </div>
          <div className="modal-body">Delete：{text}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(id)}
              disabled={isLoadingDelete}
            >
              <div
                className={`spinner-border spinner-border-sm text-light opacity-50 me-1 ${
                  isLoadingDelete ? '' : 'd-none'
                }`}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
