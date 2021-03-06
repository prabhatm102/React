import React from "react";

export default function ModalHeader({ title }) {
  return (
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        {title}
      </h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
  );
}
