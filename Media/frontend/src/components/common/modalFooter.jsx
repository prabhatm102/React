import React from "react";

export default function ModalFooter({ cancelLabel, actionLabel }) {
  return (
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        {cancelLabel}
      </button>
      <button type="button" className="btn btn-primary">
        Save changes
      </button>
    </div>
  );
}
