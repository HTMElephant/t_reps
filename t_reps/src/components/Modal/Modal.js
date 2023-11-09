import "./Modal.css";

const Modal = ({ children, open, close }) => {
  if (!open) {
    return <></>;
  }

  return (
    <div onClick={close} className="modal-background">
      <div
        className="modal"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
